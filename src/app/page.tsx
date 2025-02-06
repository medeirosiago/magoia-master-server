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
 * Icons
 */
import SnowFlakeIcon from "@app/components/LottieIcons/looties/snowflake.json";

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
	// useEffect(() => {
	// 	const disableContextMenu = (e: Event) => e.preventDefault();
	// 	document.addEventListener("contextmenu", disableContextMenu);

	// 	return () => document.removeEventListener("contextmenu", disableContextMenu);
	// }, []);

	const {
		connectionStatus,
		states,
		getState,
		callService,
		// subscribeEvents,
		// unsubscribeEvents,
	} = useWebSocketContext();

	const airEntity: Climate = getState("climate.ar");
	const weatherEntity = getState("weather.astroweather_quarto");
	const clockEntity = getState("sensor.date_time");
	const forecastState = getState("weather.forecast_home")?.state;

	const magoiaMonitor = getState("switch.monitor_goia");
	const airState = airEntity?.state;
	const isAirOn = airEntity?.state !== "off";

	if (!airEntity) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<p>Carregando informações do ar-condicionado...</p>
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
