"use client";

import React, { useEffect, useState } from "react";
/**
 * NextUi Components
 */
import { Button } from "@heroui/button";

/**
 * HA
 */
import { WebSocketProvider, useWebSocketContext } from "./haProvider/WebSocketProvider";

/**
 * Entities
 */
import { HvacMode, Climate } from "./haProvider/entities";
import CardClimate from "./components/CardClimate";
import PageContentWrapper from "./components/PageContentWrapper";
import AnimatedBeam from "./components/animata/background/animated-beam";

export default function PageWrapper() {
	return (
		<WebSocketProvider>
			<Page />
		</WebSocketProvider>
	);
}

function Page() {
	const {
		connectionStatus,
		states,
		getState,
		callService,
		// subscribeEvents,
		// unsubscribeEvents,
	} = useWebSocketContext();

	// Pegamos a entity do ar, caso exista
	const airEntity: Climate = getState("climate.ar");

	// Da entity, obtemos o "state" (ex.: "off", "cool", "heat", etc.)
	const airState = airEntity?.state;
	// Se `airEntity` ainda não foi carregada, airEntity será undefined.

	// Opcional: se quiser armazenar localmente (caso precise manipular):
	// const [localAirState, setLocalAirState] = useState(airState);
	// // Sincroniza quando "airState" mudar
	// useEffect(() => {
	//   setLocalAirState(airState);
	// }, [airState]);

	function ligarAr() {
		callService({
			domain: "climate",
			service: "set_hvac_mode",
			service_data: {
				entity_id: "climate.ar",
				hvac_mode: "cool",
			},
		})
			.then((resposta) => {
				console.log("Sucesso ao ligar ar:", resposta);
			})
			.catch((err) => console.error("Erro ao chamar serviço:", err));
	}

	function desligarAr() {
		callService({
			domain: "climate",
			service: "turn_off",
			service_data: {
				entity_id: "climate.ar",
			},
		})
			.then((resposta) => {
				console.log("Sucesso ao desligar ar:", resposta);
			})
			.catch((err) => console.error("Erro ao chamar serviço:", err));
	}

	console.log("🚀 ~ Page ~ states:", states);
	console.log("🚀 ~ Page ~ airEntity:", airEntity);

	// Caso a entity ainda não exista no `states`, podemos exibir um loading
	if (!airEntity) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<p>Carregando informações do ar-condicionado...</p>
			</div>
		);
	}

	// Se chegou aqui, já temos airEntity
	return (
		<div>
			{/* <Button
        className="w-full h-full text-lg"
        color="primary"
        variant="shadow"
        // Caso esteja OFF, clica para ligar; caso contrário, clica para desligar
        onPress={airState === HvacMode.OFF ? ligarAr : desligarAr}
      >
        {airState === HvacMode.OFF ? "LIGAR O AR" : "DESLIGAR O AR"}
      </Button>

      <p>Status da conexão: {connectionStatus}</p>
      <p>Estado do ar-condicionado: {airState}</p> */}
			<AnimatedBeam>
				<CardClimate airInfo={airEntity} changeTemperature={callService} />
			</AnimatedBeam>
			{/* <PageContentWrapper
				components={[<CardClimate airInfo={airEntity} changeTemperature={callService} />]}
			/> */}
		</div>
	);
}
