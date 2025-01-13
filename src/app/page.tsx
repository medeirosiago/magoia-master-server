"use client";

import * as React from "react";

import { Button } from "@nextui-org/button";

import { turnLightsOn, turnLightsOff } from "./services/turnLights"; // Importe as funções do serviço

import { Providers } from "./providers";

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
		<Providers>
			<div style={{ display: "flex", gap: "16px" }}>
				<Button color="primary" variant="shadow" onPress={handleTurnOn}>
					Ligar todas as luzes
				</Button>
				<Button color="secondary" variant="shadow" onPress={handleTurnOff}>
					Desligar todas as luzes
				</Button>
			</div>
		</Providers>
	);
}
