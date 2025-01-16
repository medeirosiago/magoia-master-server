"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const WebSocketContext = createContext(null);
const token = process.env.NEXT_PUBLIC_WEBSOCKET_TOKEN;

export const WebSocketProvider = ({ children }) => {
	const socketUrl = "ws://raspberrypi.local:8123/api/websocket"; // Substitua pela URL do seu WebSocket.
	const [lastMessage, setLastMessage] = useState(null);

	const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
		onOpen: () => {
			console.log("WebSocket conectado");

			// Envia a mensagem de autenticação
			sendJsonMessage({
				type: "auth",
				access_token: token,
			});
		},
		onMessage: (message) => {
			console.log("🚀 ~ WebSocketProvider ~ message:", message);
			setLastMessage(message);
		},
		shouldReconnect: () => true, // Sempre tenta reconectar
	});

	// Enviar a mensagem de inscrição quando conectado
	useEffect(() => {
		if (readyState === 1) {
			// Estado 1 = Conectado
			sendJsonMessage({
				id: 18,
				type: "subscribe_events",
				event_type: "state_changed",
			});
			console.log("Mensagem de inscrição enviada");
		}
	}, [readyState, sendJsonMessage]); // Dispara quando o estado ou a função sendJsonMessage muda

	const connectionStatus = {
		0: "Conectando",
		1: "Conectado",
		2: "Fechando",
		3: "Fechado",
	}[readyState];

	return (
		<WebSocketContext.Provider value={{ sendJsonMessage, lastMessage, connectionStatus }}>
			{children}
		</WebSocketContext.Provider>
	);
};

export const useWebSocketContext = () => {
	const context = useContext(WebSocketContext);
	if (!context) {
		throw new Error("useWebSocketContext deve ser usado dentro de um WebSocketProvider");
	}
	return context;
};
