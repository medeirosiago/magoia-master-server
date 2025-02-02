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
 * Utils
 */
import formatTimestamp from "./utils/formatTimestamp";
import { weatherConfigs } from "./utils/weatherConfigs";

/**
 * Entities
 */
import { HvacMode, Climate } from "./haProvider/entities";
import CardClimate from "./components/CardClimate";
import PageContentWrapper from "./components/PageContentWrapper";
import AnimatedBeam from "./components/animata/background/animated-beam";

/**
 * Component
 */
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
	const weatherEntity = getState("weather.astroweather_quarto");
	const clockEntity = getState("sensor.date_time");
	const forecastState = getState("weather.forecast_home")?.state;
	console.log("🚀 ~ Page ~ forecastEntity:", forecastState);

	// console.log(
	// 	"my weatherConfigs",
	// 	weatherEntity?.attributes &&
	// 		clockEntity?.state &&
	// 		weatherConfigs({ attributes: weatherEntity?.attributes, dateTime: clockEntity?.state }),
	// );
	const airState = airEntity?.state;

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
			<PageContentWrapper
				components={[<CardClimate airInfo={airEntity} changeTemperature={callService} />]}
				weatherConfigs={weatherConfigs({ attributes: weatherEntity?.attributes, dateTime: clockEntity?.state, forecast: forecastState })}
			/>
		</div>
	);
}
