"use client";

import React, { useCallback, useState, useEffect } from "react";

/*
 * NextUI Components
 */
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";

/**
 * HOCs
 */
import MinimalCard from "../MinimalCard";

/**
 * Entities
 */
import { CallServiceMessage, Climate, HvacMode } from "@app/haProvider/entities";
import GlowingCard from "../animata/card/glowing-card";

import { useTheme } from "next-themes";

/**
 * Component
 */
const CardClimate = ({ airInfo, changeTemperature, isOn }) => {
	const { attributes, state } = airInfo;
	const [currentTemperature, setCurrentTemperature] = useState(attributes.temperature);

	useEffect(() => {
		setCurrentTemperature(attributes.temperature);
	}, [airInfo]);

	const isOff = (state) => state === HvacMode.OFF;

	function ligarAr() {
		changeTemperature({
			domain: "climate",
			service: "set_hvac_mode",
			service_data: {
				entity_id: "climate.ar",
				hvac_mode: "cool",
			},
		})
			.then((resposta) => {
				setCurrentTemperature(attributes.temperature);
			})
			.catch((err) => console.error("Erro ao chamar serviço:", err));
	}

	function desligarAr() {
		changeTemperature({
			domain: "climate",
			service: "turn_off",
			service_data: {
				entity_id: "climate.ar",
			},
		})
			.then((resposta) => resposta)
			.catch((err) => console.error("Erro ao chamar serviço:", err));
	}

	const setTemperature = useCallback((value) => {
		changeTemperature({
			domain: "climate",
			service: "set_temperature",
			service_data: {
				entity_id: "climate.ar",
				temperature: value,
			},
		});
		setCurrentTemperature(value);
	}, []);

	const { setTheme } = useTheme();
	return (
		<Card className="climate-card" radius="lg" shadow="md" isBlurred>
			<CardHeader className="flex gap-3">
				<div className="flex flex-row">
					<b className="text-lg">Ar Condicionado</b>
				</div>
			</CardHeader>
			<CardBody className="py-2">
				<div className="flex flex-col gap-6 w-full max-w-md">
					<Slider
						id="temperature-slider"
						isDisabled={isOff(state)}
						className="max-w-md"
						color="foreground"
						defaultValue={attributes.temperature}
						label="Temperatura"
						value={currentTemperature}
						maxValue={30}
						minValue={18}
						showSteps={true}
						size="md"
						step={1}
						onChange={(value) => setCurrentTemperature(value)}
						onChangeEnd={(value) =>
							changeTemperature({
								domain: "climate",
								service: "set_temperature",
								service_data: {
									entity_id: "climate.ar",
									temperature: value,
								},
							})
						}
						renderThumb={(props) => (
							<div
								{...props}
								className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
							>
								<span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
							</div>
						)}
					/>
				</div>
			</CardBody>

			<CardFooter className="flex flex-row gap-2">
				<Button
					onPress={isOff(state) ? ligarAr : desligarAr}
					size="sm"
					radius="full"
					variant="shadow"
					color={isOff(state) ? "success" : "danger"}
				>
					{isOff(state) ? "Ligar" : "Desligar"}
				</Button>
				<Button
					className={currentTemperature == 18 ? "active-temperature" : ""}
					size="sm"
					onPress={() => setTemperature(18)}
					radius="full"
					variant="shadow"
					color="primary"
					isDisabled={isOff(state)}
				>
					18
				</Button>
				<Button
					className={currentTemperature == 21 ? "active-temperature" : ""}
					size="sm"
					onPress={() => setTemperature(21)}
					radius="full"
					variant="shadow"
					color="primary"
					isDisabled={isOff(state)}
				>
					21
				</Button>
				<Button
					className={currentTemperature == 23 ? "active-temperature" : ""}
					size="sm"
					onPress={() => setTemperature(23)}
					radius="full"
					variant="shadow"
					color="primary"
					isDisabled={isOff(state)}
				>
					23
				</Button>
			</CardFooter>
		</Card>
	);
};

export default MinimalCard(CardClimate);
