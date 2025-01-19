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
  timeout: 5000,
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

  // 1) Para chamadas "request/resposta" (get_states, call_service, etc.)
  //    promisesRef[mensagemId] = { timeout, callback }
  const promisesRef = useRef({});

  // 2) Para subscriptions de eventos contínuos
  //    subscriptionsRef[mensagemId] = { onEvent: callback }
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
          // Depois de obter estados, assina evento 'state_changed'
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

    // 2) Resolução de promises para mensagens de "result"
    //    Ex.: get_states, call_service, etc.
    if (data.type === "result" && data.id) {
      const promiseObj = promisesRef.current[data.id];
      if (promiseObj) {
        // Resolvemos e deletamos a promise
        const { callback, timeout } = promiseObj;
        if (timeout) clearTimeout(timeout);
        if (callback) callback(data);
        delete promisesRef.current[data.id];
      }

      // Se for uma assinatura de eventos (subscribe_events), e deu certo,
      // guardamos o callback em subscriptionsRef. Mas *apenas* se foi success = true.
      if (data.success) {
        // Verifica se a mensagem original era subscribe_events
        // Podemos guardar a callback *depois* do .then() lá na subscribeEvents,
        // ou verificar aqui. Aqui é mais "automático".
        // MAS para isso, precisamos saber se era "subscribe_events"
        // A maneira mais simples é: no .then() do subscribeEvents, já armazenar.
      }
    }

    // 3) Mensagens de tipo "event" (recebidas continuamente para as subscriptions)
    if (data.type === "event" && data.id) {
      // data.id = "id da subscription"
      const subscription = subscriptionsRef.current[data.id];
      if (subscription && subscription.onEvent) {
        subscription.onEvent(data);
      }
    }
  }, [lastJsonMessage]);

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

  /**
   * Faz a assinatura de eventos, e quando chegar a *primeira resposta* (type: "result", success: true),
   * armazenamos o callback em `subscriptionsRef`. Depois, cada vez que vier
   * data.type === "event" e data.id === esse ID, chamaremos "callbackFn(data)".
   */
  function subscribeEvents(event_type = "state_changed", callbackFn) {
    const subscribeData = {
      type: "subscribe_events",
      event_type,
    };
    console.log("[subscribeEvents] subscribeData =>", subscribeData);

    return send(subscribeData).then((data: any) => {
      console.log("[subscribeEvents => then]", data, "id =", data.id);

      if (!data.success) {
        return Promise.reject(new Error("Falha ao assinar evento: " + event_type));
      }

      // Agora sabemos que o HA criou a subscription com `id = data.id`.
      // Guardamos a callback no `subscriptionsRef`.
      subscriptionsRef.current[data.id] = {
        onEvent: callbackFn,
      };

      // Retornamos o `data.id`, para poder desinscrever depois, se necessário.
      return data.id;
    });
  }

  /**
   * Desinscreve de um subscriptionId (normalmente obtido pelo .then do subscribeEvents).
   * Ao receber sucesso, removemos de subscriptionsRef.
   */
  function unsubscribeEvents(subscriptionId) {
    return send({ type: "unsubscribe_events", subscription: subscriptionId }).then((res) => {
      if (subscriptionsRef.current[subscriptionId]) {
        delete subscriptionsRef.current[subscriptionId];
      }
      return res;
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
    if (!data) return;

    // Atualiza o array de estados
    setStates((prevStates) => {
      const idx = prevStates.findIndex((s) => s.entity_id === data.entity_id);
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
  function getState(entityId) {
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
    send, // Envio genérico, se precisar
  };
}

// --------------------------------------------------------------------
// Contexto e Provider
const HomeAssistantContext = createContext(null);

export function WebSocketProvider({ children }) {
  // Instancia a lógica do Home Assistant
  const ha = useHomeAssistant();

  return (
    <HomeAssistantContext.Provider value={ha}>
      {children}
    </HomeAssistantContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(HomeAssistantContext);
  if (!context) {
    throw new Error(
      "useHomeAssistantContext deve ser usado dentro de um <HomeAssistantProvider>"
    );
  }
  return context;
}
