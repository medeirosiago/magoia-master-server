"use client";

import React, { useEffect, useState } from "react";

/**
 * NextUi Components
 */
import { Spinner } from "@heroui/react";

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
import PageContentWrapper from "./components/PageContentWrapper";
import AnimatedBeam from "./components/animata/background/animated-beam";

/**
 * Icons
 */
import SnowFlakeIcon from "@app/components/LottieIcons/looties/snowflake.json";
import CardLightsIcon from "@app/components/LottieIcons/looties/cardLightsIcon.json";

/**
 * Cards
 */
import CardClimate from "./components/CardClimate";
import CardLights from "./components/CardLights";

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
	// Função para remover o botão direito ao segunrar o touch
	// useEffect(() => {
	// 	const disableContextMenu = (e: Event) => e.preventDefault();
	// 	document.addEventListener("contextmenu", disableContextMenu);

	// 	return () => document.removeEventListener("contextmenu", disableContextMenu);
	// }, []);

	const {
		// connectionStatus,
		// states,
		getState,
		callService,
		// subscribeEvents,
		// unsubscribeEvents,
	} = useWebSocketContext();

	const airEntity: Climate = getState("climate.ar");
	const weatherEntity = getState("weather.astroweather_quarto");
	const clockEntity = getState("sensor.date_time");
	const forecastState = getState("weather.forecast_home")?.state;
	const filamentoState = getState("light.lampada_filamento_inteligente");
	console.log("🚀 ~ Page ~ filamentoState:", filamentoState);
	const luzState = getState("light.luz");
	console.log("🚀 ~ Page ~ luzState:", luzState);
	const magoiaMonitor = getState("switch.monitor_goia");
	const leticiaMonitor = getState("switch.monitor_leticia");

	const isAirOn = airEntity?.state !== "off";
	const isFilamentoOn = filamentoState?.state !== "off";
	const isLuzOn = luzState?.state !== "off";

	const isLoading =
		!airEntity ||
		!weatherEntity ||
		!weatherEntity.attributes ||
		!weatherEntity.attributes.sun_next_rising ||
		!weatherEntity.attributes.sun_next_setting ||
		!clockEntity ||
		!clockEntity.state ||
		!forecastState ||
		!magoiaMonitor ||
		!magoiaMonitor.state ||
		!leticiaMonitor ||
		!leticiaMonitor.state;

	if (isLoading) {
		return (
			<div
				className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
				style={{
					backgroundImage:
						"url('https://www.wallpaperflare.com/static/411/76/909/dragon-ball-dragon-ball-z-majin-boo-dragonball-wallpaper-preview.jpg')",
				}}
			>
				<Spinner
					color="warning"
					label="Carregando o Magoia Master Server e o Home Assistant..."
				/>
			</div>
		);
	}

	return (
		<div>
			<PageContentWrapper
				components={[
					<CardClimate
						airInfo={airEntity}
						changeTemperature={callService}
						icon={SnowFlakeIcon}
						isOn={isAirOn}
						MinimizeButton={null}
					/>,
					<CardLights
						isOn={isFilamentoOn || isLuzOn}
						icon={CardLightsIcon}
						MinimizeButton={null}
					/>,
				]}
				weatherConfigs={weatherConfigs({
					attributes: weatherEntity?.attributes,
					dateTime: clockEntity?.state,
					forecast: forecastState,
				})}
			/>
		</div>
	);
}
