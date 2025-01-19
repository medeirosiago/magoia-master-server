// useHomeAssistant
"use client";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";

import useWebSocket from "react-use-websocket";
const token = process.env.NEXT_PUBLIC_WEBSOCKET_TOKEN;

// Valores padrão
const defaultConfig = {
	host: "raspberrypi",
	protocol: "ws", // ou "wss" se usar SSL
	port: 8123,
	retryTimeout: 5000,
	timeout: 50000,
	retryCount: 10,
	token: token, // Caso não use token, pode trocar por password
};

export function useHomeAssistant(options = {}) {
	// Mescla as opções passadas com o default
	const config = { ...defaultConfig, ...options };

	// Monta a URL do WebSocket
	const socketUrl = `${config.protocol}://${config.host}:${config.port}/api/websocket`;

	// Estados locais
	const [states, setStates] = useState([]);
	const [connectionStatus, setConnectionStatus] = useState("disconnected");

	// "idRef" para controlar o contador de mensagens
	const idRef = useRef(1);

	// "promisesRef" para mapear "id da mensagem" => { timeout, callback }
	const promisesRef = useRef({});

	const subscriptionsRef = useRef({});

	// react-use-websocket
	// ------------------------------------------------------------------
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
		shouldReconnect: () => true, // Reconexão automática
		reconnectAttempts: config.retryCount,
		reconnectInterval: config.retryTimeout,
		onOpen: () => {
			setConnectionStatus("connected");
			// Assim que conectar, tentamos autenticar
			authenticate();
		},
		onError: () => {
			setConnectionStatus("connection_error");
		},
		onClose: () => {
			setConnectionStatus("connection_closed");
		},
	});

	// ------------------------------------------------------------------
	// Função de autenticação
	function authenticate() {
		if (!config.token) {
			console.error("Nenhum token fornecido para Home Assistant");
			return;
		}
		// Envia mensagem de autenticação
		sendJsonMessage({
			type: "auth",
			access_token: config.token,
		});
	}

	// ------------------------------------------------------------------
	// Efeito para processar mensagens recebidas (lastJsonMessage)
	useEffect(() => {
		if (!lastJsonMessage) return;
		const data: any = lastJsonMessage;

		console.log("[useEffect => lastJsonMessage]", data);
		console.log("[useEffect => promisesRef.current]", promisesRef.current);
	

		// 1) Mensagens de autenticação
		if (data.type === "auth_ok") {
			setConnectionStatus("authenticated");
			// Ao autenticar, podemos obter estados iniciais
			getStates()
				.then((response: any) => {
					setStates(response.result || []);
					// E então assinamos aos eventos
					console.log("🚀 ~ .then ~ updateState:", updateState);

					subscribeEvents("state_changed", updateState);
				})
				.catch((err) => console.error("Erro ao obter estados:", err));
		}

		if (data.type === "auth_required") {
			// Se token estiver configurado, reenviamos
			authenticate();
		}

		if (data.type === "auth_invalid") {
			console.error("Token inválido para Home Assistant");
			setConnectionStatus("auth_invalid");
			return;
		}

		// 2) Resolução de promises
		if (data.id && promisesRef.current[data.id]) {
			console.log("🚀 ~ useEffect ~ data:", data);
			const { callback, timeout } = promisesRef.current[data.id];
			console.log("🚀 ~ useEffect ~ callback:", callback(data));
			if (timeout) clearTimeout(timeout);
			if (callback) callback(data);
			delete promisesRef.current[data.id];
		}
	}, [lastJsonMessage]); // Dispara sempre que `lastJsonMessage` mudar

	// ------------------------------------------------------------------
	// Envio de mensagens com ID
	function send(message, addId = true) {
		return new Promise((resolve, reject) => {
			let msg = { ...message };
	
			if (addId) {
				msg.id = idRef.current;
				idRef.current += 1;
			}
	
			const timeout = setTimeout(() => {
				reject(new Error("Não houve resposta do Home Assistant"));
			}, config.timeout);
	
			promisesRef.current[msg.id] = {
				callback: resolve,
				timeout,
			};
	
			console.log("[send] final msg =>", msg);
			console.log("[send] promisesRef =>", promisesRef.current);
	
			sendJsonMessage(msg);
		});
	}

	// ------------------------------------------------------------------
	// Métodos principais (similar aos da classe Homeassistant)
	function getStates() {
		return send({ type: "get_states" });
	}

	function subscribeEvents(event_type = "state_changed", callbackFn) {
		// data básico p/ subscribe_events
		const subscribeData = {
			// id: 18,
			type: "subscribe_events",
			event_type,
		};
		console.log("[subscribeEvents] subscribeData =>", subscribeData);

		// Chamamos `send(...)`, e ao receber a resposta de sucesso,
		// substituímos o "callback" pela função callbackFn,
		// para receber dados em tempo real
		return send(subscribeData)
			.then((data: any) => {
				console.log("[subscribeEvents => then]", data, "id =", data.id);

				if (!data.success) {
					return Promise.reject(new Error("Falha ao assinar evento: " + event_type));
				}
				
				// console.log("[subscribeEvents => then] promisesRef before setting callback:", promisesRef.current);
				// console.log("[subscribeEvents => then] promisesRef.current[data.id]:", promisesRef.current[data.id]);

				// promisesRef.current[data.id].callback = callbackFn || {};
				// return data;
				// Se assinou com sucesso, guardamos o `callbackFn`
			}).catch((err) => {
				console.error("Erro ao fazer subscribe:", err);
				throw err;
			});
	}

	function unsubscribeEvents(subscription) {
		return send({
			type: "unsubscribe_events",
			subscription,
		});
	}

	function callService(serviceData) {
		// Exemplo: { domain: 'light', service: 'turn_on', service_data: {entity_id: 'light.room'} }
		return send({ type: "call_service", ...serviceData });
	}

	// ------------------------------------------------------------------
	// Atualiza estado local quando receber "state_changed"
	function updateState(change) {
		const { event } = change;
		console.log("🚀 ~ updateState ~ event:", event);
		if (!event || event.event_type !== "state_changed") return;

		const { data } = event; // { entity_id, old_state, new_state }
		console.log("🚀 ~ updateState ~ data:", data);
		if (!data) return;

		// Atualiza o array de estados
		setStates((prevStates) => {
			const idx = prevStates.findIndex((s) => s.entity_id === data.entity_id);
			console.log("🚀 ~ setStates ~ idx:", idx);
			if (idx === -1) {
				// Se não existe, insere
				return [...prevStates, data.new_state];
			} else {
				// Se existe, substitui pelo novo
				const updated = [...prevStates];
				updated[idx] = data.new_state;
				return updated;
			}
		});
	}

	// ------------------------------------------------------------------
	// Helper para obter o estado atual de uma entity_id específica
	function getState(entityId: string) {
		return states.find((s) => s.entity_id === entityId);
	}

	// ------------------------------------------------------------------
	// Retorna métodos e dados que o "HomeAssistantProvider" vai expor
	return {
		connectionStatus,
		readyState,
		states,
		getState,
		callService,
		subscribeEvents,
		unsubscribeEvents,
		send, // Envio genérico
	};
}

const HomeAssistantContext = createContext(null);

// Exporta o provider
export function WebSocketProvider({ children }) {
	// Instancia a lógica do Home Assistant
	const ha = useHomeAssistant();

	return <HomeAssistantContext.Provider value={ha}>{children}</HomeAssistantContext.Provider>;
}

// Exporta um hook simples p/ consumir o contexto
export function useWebSocketContext() {
	const context = useContext(HomeAssistantContext);
	if (!context) {
		throw new Error(
			"useHomeAssistantContext deve ser usado dentro de um <HomeAssistantProvider>",
		);
	}
	return context;
}
