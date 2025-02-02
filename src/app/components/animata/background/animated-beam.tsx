"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* -----------------------------------------------------------------
   Efeito de "beans" para o forecast rainy (chuva)
------------------------------------------------------------------ */
function Beam({ index }: { index: number }) {
	const flag = index % 8 === 0;
	return (
		<div
			className={cn("h-full animate-meteor", {
				"[--duration:7s]": flag,
				"[--duration:11s]": !flag,
			})}
			style={{
				width: "6px",
				transform: "translateY(-20%)",
				["--delay" as any]: `${index * 0.5}s`,
			}}
		>
			<div
				style={{
					clipPath: "polygon(54% 0, 54% 0, 60% 100%, 40% 100%)",
				}}
				className={cn("w-full", {
					"h-8": flag,
					"h-12": !flag,
				})}
			>
				<div className="h-full w-full bg-gradient-to-b from-neutral-50/50 via-neutral-100 via-75% to-neutral-50" />
			</div>
		</div>
	);
}

/* -----------------------------------------------------------------
   Hook para calcular a quantidade de colunas (para o efeito rainy)
------------------------------------------------------------------ */
function useGridCount() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [count, setCount] = useState(0);

	useEffect(() => {
		const updateCount = () => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;
			const cellSize = 40;
			setCount(Math.ceil(rect.width / cellSize));
		};
		updateCount();
		window.addEventListener("resize", updateCount);
		return () => window.removeEventListener("resize", updateCount);
	}, []);

	return { count, containerRef };
}

/* -----------------------------------------------------------------
   Componente para renderizar o efeito rainy (chuva / beans)
------------------------------------------------------------------ */
function RainyEffect() {
	const { count, containerRef } = useGridCount();
	return (
		<div ref={containerRef} className="absolute inset-0">
			{Array.from({ length: count }, (_, i) => (
				<div key={i} className="relative h-full w-px">
					{(i + 1) % 4 === 0 && <Beam index={i + 1} />}
				</div>
			))}
		</div>
	);
}

/* -----------------------------------------------------------------
   Componente InfiniteClouds para o forecast "cloudy"
   Aqui criamos um container que contém duas cópias do conjunto de nuvens.
   O container é animado com 'animate-cloud-scroll', fazendo com que as nuvens
   se movam continuamente para a esquerda em loop infinito.
------------------------------------------------------------------ */
function InfiniteClouds() {
	const tl = gsap.timeline({ repeat: -1 });
	tl.to("#cloud-circle", {
		duration: 50, // duração de 50 segundos
		x: 1000, // move 1000px no eixo X
		ease: "linear", // utiliza uma easing linear (equivalente ao Linear.easeNone)
	});
	return (
		<>
			<div id="cloud-circle"></div>

			<svg id="svg-filter" width="0" height="0">
				<filter id="filter">
					<feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="10" />
					<feDisplacementMap in="SourceGraphic" scale="180" />
				</filter>
			</svg>
		</>
	);
}

/* -----------------------------------------------------------------
   Função para definir a tonalização do background (dia ou noite)
------------------------------------------------------------------ */
const getBackgroundStyle = (weatherConfigs: any) => {
	if (weatherConfigs.astro === "moon") {
		return {
			background:
				"linear-gradient(180deg, #0a0a2a 0%, #0a0a2a 50%, #07072c 70%, #010018 89%)",
		};
	} else {
		return {
			background:
				"linear-gradient(180deg, rgba(78,88,167,1) 0%, rgba(108,128,197,1) 50%, rgba(137,158,209,1) 70%, rgba(175,191,225,1) 89%)",
		};
	}
};

/* -----------------------------------------------------------------
   Componente Background:
   - Aplica a tonalização do fundo com base em 'astro' (dia ou noite).
   - Dependendo do forecast:
       • "cloudy": renderiza o efeito de nuvens com loop infinito (InfiniteClouds)
       • "rainy": renderiza o efeito de chuva (RainyEffect)
------------------------------------------------------------------ */
function Background({ weatherConfigs }: { weatherConfigs: any }) {
	const backgroundStyle = getBackgroundStyle(weatherConfigs);
	return (
		<div style={backgroundStyle} className="absolute inset-0">
			{weatherConfigs.forecast === "cloudy" && <InfiniteClouds />}
			{weatherConfigs.forecast === "rainy" && <RainyEffect />}
		</div>
	);
}

/* -----------------------------------------------------------------
   Componente Principal AnimatedBeam:
   Recebe o objeto weatherConfigs e renderiza:
     - O background (com tonalização e overlays conforme o forecast)
     - O conteúdo (_children_) por cima
------------------------------------------------------------------ */
export default function AnimatedBeam({
	children,
	className,
	weatherConfigs,
}: {
	children: React.ReactNode;
	className?: string;
	weatherConfigs: any; // Idealmente, defina uma interface para esses dados
}) {
	return (
		<div className={cn("relative min-h-screen p-[6px] overflow-hidden", className)}>
			<Background weatherConfigs={weatherConfigs} />
			<div className="relative h-full w-full">{children}</div>
		</div>
	);
}
