"use client";

import React, { useCallback, useState, useEffect } from "react";
import Lottie from "react-lottie";
import Cold from "../looties/cold.json";
import AirOffIcon from "../looties/airOffIcon.json";

/*
 * NextUI Components
 */
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Slider } from "@heroui/slider";

/**
 * Entities
 */
import { CallServiceMessage, Climate, HvacMode } from "@app/haProvider/entities";

/**
 * Component
 */
const CardClimate = ({ airInfo, changeTemperature }) => {
	const { attributes, state } = airInfo;
	console.log("🚀 ~ CardClimate ~ airInfo:", airInfo);
	const [currentTemperature, setCurrentTemperature] = useState(attributes.temperature);

	const [icon, setIcon] = useState<React.ReactNode>(<h1>OFF</h1>);

	// Toda a lógica de trocar ícone fica no useEffect
	useEffect(() => {
		if (state === HvacMode.COOL) {
			// primeiro ícone
			setIcon(<Lottie options={airOnOption} height={100} width={200} />);
			// depois de 1 segundo (exemplo) troca
			setTimeout(() => {
				setIcon(<Lottie options={defaultOptions} height={210} width={210} />);
			}, 1000);
		} else {
			setIcon(<h1>OFF</h1>);
		}
	}, [state]);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: Cold,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const airOnOption = {
		loop: true,
		autoplay: true,
		animationData: AirOffIcon,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};
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
				console.log("Sucesso ao ligar ar:", resposta);
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
			.then((resposta) => {
				console.log("Sucesso ao desligar ar:", resposta);
			})
			.catch((err) => console.error("Erro ao chamar serviço:", err));
	}

	const setTemperature = useCallback((value) => {
		console.log("🚀 ~ setTemperature ~ value:", value);
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

	return (
		<Card className="climate-card" radius="lg" shadow="md">
			<CardHeader className="flex gap-3">
				<div className="flex flex-col">
					<b className="text-lg">Ar Condicionado</b>
				</div>
			</CardHeader>
			<CardBody className="py-2" onClick={state === HvacMode.OFF ? ligarAr : desligarAr}>
				<div className="flex flex-col gap-6 w-full max-w-md">
					<Slider
						className="max-w-md"
						color="foreground"
						defaultValue={currentTemperature}
						label="Temperatura"
						maxValue={30}
						minValue={18}
						showSteps={true}
						size="md"
						step={1}
						onChangeEnd={(value) => setTemperature(value)}
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
				{icon}
			</CardBody>
			<CardFooter></CardFooter>
		</Card>
	);
};

export default CardClimate;
