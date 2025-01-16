"use client";

import * as React from "react";
import { Button } from "@nextui-org/button";
import { WebSocketProvider, useWebSocketContext } from "./WebSocketProvider.jsx";
import { turnLightsOn, turnLightsOff } from "./services/turnLights";

export default function PageWrapper() {
  return (
    <WebSocketProvider>
      <Page />
    </WebSocketProvider>
  );
}

function Page() {
  const { sendMessage, lastMessage, connectionStatus } = useWebSocketContext();

  const handleTurnOn = async () => {
    try {
      const result = await turnLightsOn();
      sendMessage(JSON.stringify({ type: "light", action: "on" }));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTurnOff = async () => {
    try {
      const result = await turnLightsOff();
      sendMessage(JSON.stringify({ type: "light", action: "off" }));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 w-screen h-screen p-10">
      <Button
        className="w-full h-full text-lg"
        color="primary"
        variant="shadow"
        onPress={handleTurnOn}
      >
        Ligar todas as luzes
      </Button>
      <Button
        className="w-full h-full text-lg"
        color="secondary"
        variant="shadow"
        onPress={handleTurnOff}
      >
        Desligar todas as luzes
      </Button>
      <p>Status da conexão: {connectionStatus}</p>
      {lastMessage && <p>Última mensagem: {lastMessage.data}</p>}
    </div>
  );
}
