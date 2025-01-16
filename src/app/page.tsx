"use client";

import * as React from "react";

import { Button } from "@nextui-org/button";

import { turnLightsOn, turnLightsOff } from "./services/turnLights"; // Importe as funções do serviço

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Page() {
  const handleTurnOn = async () => {
    try {
      const result = await turnLightsOn();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTurnOff = async () => {
    try {
      const result = await turnLightsOff();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div className="max-w-fit p-4">
    <div className="flex justify-center items-center gap-4 w-screen h-screen	p-10">
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
    </div>
    // </div>
  );
}
