"use client";

import React, { useCallback, useState, useEffect } from "react";

/*
 * Components
 */
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button, ButtonGroup } from "@heroui/button";
import { Slider } from "@heroui/slider";

import LottieIcon from "@app/components/LottieIcons/";
import airOffIcon from "@app/components/LottieIcons/looties/airOffIcon.json";

/**
 * HOCs
 */
import MinimalCard from "../MinimalCard";

/**
 * Entities
 */
import { HvacMode } from "@app/haProvider/entities";
import { useTheme } from "next-themes";

/**
 * Component
 */
const CardClimate = ({ airInfo, changeTemperature, isOn, MinimizeButton }) => {
	const { attributes, state } = airInfo;
	const [currentTemperature, setCurrentTemperature] = useState(attributes.temperature);
	const [isAnimating, setIsAnimating] = useState(false); // Estado para controlar a animação

	useEffect(() => {
		if (attributes.temperature !== currentTemperature) {
			setCurrentTemperature(attributes.temperature);
		}
	}, [attributes.temperature]);

	useEffect(() => {
		console.log("🚀 ~ CardClimate ~ isOn:", isOn);

		if (!isOn) {
			setIsAnimating(false); // Se desligado, fixa no primeiro frame
		}
	}, [isOn]);

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
		<Card className="climate-card" radius="lg" shadow="md">
			<CardHeader className="flex gap-3 justify-between">
				<b className="text-lg">Ar Condicionado</b>
				<MinimizeButton />
			</CardHeader>
			<CardBody className="py-2">
				<div className="flex flex-col gap-6">
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

			<CardFooter className="relative gap-1 justify-between">
				<Button
					isIconOnly
					onPress={isOff(state) ? ligarAr : desligarAr}
					size="lg"
					radius="full"
					variant="shadow"
					color={isOff(state) ? "danger" : "success"}
				>
					<LottieIcon
						animationData={airOffIcon}
						loop={false}
						autoplay={true}
						styles={{
							width: "90px",
							height: "90px",
						}}
					/>
				</Button>
				<Button
					className={currentTemperature == 18 ? "active-temperature" : ""}
					size="lg"
					isIconOnly
					onPress={() => setTemperature(18)}
					radius="full"
					variant={currentTemperature == 18 ? "shadow" : "bordered"}
					color="primary"
					isDisabled={isOff(state)}
				>
					18
				</Button>
				<Button
					className={currentTemperature == 21 ? "active-temperature" : ""}
					size="lg"
					isIconOnly
					onPress={() => setTemperature(21)}
					radius="full"
					variant={currentTemperature == 21 ? "shadow" : "bordered"}
					color="primary"
					isDisabled={isOff(state)}
				>
					21
				</Button>
				<Button
					className={currentTemperature == 23 ? "active-temperature" : ""}
					size="lg"
					isIconOnly
					onPress={() => setTemperature(23)}
					radius="full"
					variant={currentTemperature == 23 ? "shadow" : "bordered"}
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
