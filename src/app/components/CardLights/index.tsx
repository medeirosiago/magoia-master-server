"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useWebSocketContext } from "@app/haProvider/WebSocketProvider";

/**
 * Icons
 */
import LottieIcon from "../LottieIcons";
import LampIcon from "@app/components/LottieIcons/looties/lamp.json";
import FilamentoIcon from "@app/components/LottieIcons/looties/filamento.json";

/**
 * HOCs
 */
import MinimalCard from "../MinimalCard";

const CardLights = ({ MinimizeButton }) => {
	const { callService } = useWebSocketContext();

	const toggleLight = (entity) => {
		console.log("🚀 ~ toggleLight ~ entity:", entity);
		callService({
			domain: "light",
			service: "toggle",
			service_data: {
				entity_id: entity,
			},
		});
	};

	const setTemperature = (entity, kelvin) => {
		console.log("🚀 ~ setTemperature ~ entity, kelvin:", entity, kelvin);
		callService({
			domain: "light",
			service: "turn_on",
			service_data: {
				entity_id: entity,
				transition: 5,
				kelvin: kelvin,
				brightness_pct: 100,
			},
		});
	};

	const setBrightness = (entity, brightness) => {
		console.log("🚀 ~ setBrightness ~ entity, brightness:", entity, brightness);
		callService({
			domain: "light",
			service: "turn_on",
			service_data: {
				entity_id: entity,
				brightness_pct: brightness,
			},
		});
	};

	const turnOnAll = () => {
		console.log("🚀 ~ turnOnAll ~ turnOnAll:");

		callService({
			domain: "light",
			service: "turn_on",
			service_data: { entity_id: "light.luz" },
		});
		callService({
			domain: "light",
			service: "turn_on",
			service_data: { entity_id: "light.lampada_filamento_inteligente" },
		});
	};

	const turnOffAll = () => {
		console.log("🚀 ~ turnOffAll ~ turnOffAll:");

		callService({
			domain: "light",
			service: "turn_off",
			service_data: { entity_id: "light.luz" },
		});
		callService({
			domain: "light",
			service: "turn_off",
			service_data: { entity_id: "light.lampada_filamento_inteligente" },
		});
	};

	return (
		<Card className="lights-card" radius="lg" shadow="md">
			<CardHeader className="flex gap-3 justify-between">
				<b className="text-lg">Luzes</b>
				<MinimizeButton />
			</CardHeader>
			<CardBody className="py-2 flex flex-col gap-4">
				<div className="flex gap-4 justify-between items-center">
					<Button isIconOnly onPress={() => toggleLight("light.luz")}>
						<LottieIcon animationData={LampIcon} styles={{ width: 50, height: 50 }} />
					</Button>
					<Button
						size="lg"
						isIconOnly
						radius="full"
						style={{ backgroundColor: "#FFAA00" }} // Cor editável
						onPress={() => setTemperature("light.luz", 2000)}
					/>
					<Button
						size="lg"
						isIconOnly
						radius="full"
						style={{ backgroundColor: "#e1f7f5" }} // Cor editável
						onPress={() => setTemperature("light.luz", 5000)}
					/>
				</div>

				<div className="flex flex-row gap-4 justify-between items-center">
					<Button
						isIconOnly
						onPress={() => toggleLight("light.lampada_filamento_inteligente")}
					>
						<LottieIcon
							animationData={FilamentoIcon}
							styles={{ width: 50, height: 50 }}
						/>
					</Button>
					<Button
						size="lg"
						isIconOnly
						radius="full"
						style={{
							backgroundColor: "#FFAA00",
							color: "black",
							fontSize: "16px",
							fontWeight: "600",
						}} // Cor editável
						onPress={() => setBrightness("light.lampada_filamento_inteligente", 20)}
					>
						20%
					</Button>
					<Button
						size="lg"
						isIconOnly
						radius="full"
						style={{
							backgroundColor: "#FFAA00",
							color: "black",
							fontSize: "16px",
							fontWeight: "600",
						}} // Cor editável
						onPress={() => setBrightness("light.lampada_filamento_inteligente", 100)}
					>
						100%
					</Button>
				</div>
			</CardBody>

			<CardFooter className="flex flex-row gap-2">
				<Button
					size="lg"
					radius="full"
					variant="shadow"
					style={{ fontSize: "16px", fontWeight: "600" }}
					color="success"
					onPress={turnOnAll}
				>
					Ligar Tudo
				</Button>
				<Button
					size="lg"
					radius="full"
					variant="bordered"
					style={{ fontSize: "16px", fontWeight: "600" }}
					color="danger"
					onPress={turnOffAll}
				>
					Desligar Tudo
				</Button>
			</CardFooter>
		</Card>
	);
};

export default MinimalCard(CardLights);
