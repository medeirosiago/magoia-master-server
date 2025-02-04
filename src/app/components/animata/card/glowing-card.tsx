"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
	fromColor?: string;
	viaColor?: string;
	toColor?: string;
	title?: string;
	children?: React.ReactNode;
}

export default function GlowingCard({
	fromColor = "#adff00",
	viaColor = "#028900",
	toColor = "#00ff83",
	title = "Glowing",
	children,
	className,
	...props
}: GlowCardProps) {
	return (
		// 1) Container `relative` e Tamanho fixo de 313×300
		<div
			{...props}
			className={cn(
				"relative h-[300px] w-[260px]", // <-- tamanho fixo aqui
				"rounded-3xl bg-gradient-to-r p-0.5",
				"hover:shadow-glow hover:brightness-150",
				"transition-all duration-500",
				className,
			)}
			style={{
				backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
				transition: "box-shadow 0.5s ease",
			}}
		>
			{/* 2) Camada de blur/gradiente, ABSOLUTA */}
			{/* <div
				className={cn(
					"pointer-events-none absolute inset-0 rounded-3xl",
					// Se "blur-20" não existir no seu Tailwind, use "blur-[20px]" ou "blur-xl"
					"blur-[20px]",
				)}
				style={{
					// Se quiser repetir o mesmo gradiente do contêiner
					// backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})`,
					backgroundColor: 'black',
					transition: "filter 0.5s ease",
				}}
			/> */}

			{/* 3) Conteúdo real em `relative z-10`, ocupa 100% do contêiner */}
			<div
				className="
          relative z-10
          flex flex-col gap-2
          h-full w-full
          rounded-3xl
          bg-opacity-100
          px-5
					py-6
					
        "
				// style={{
				// 	backgroud: "#563e7b",
				// }}
				style={{
					background: "#1e293b35",
					transition: "filter 0.5s ease",
				}}
			>
				<div className="mb-2 text-xl text-gray-50">{title}</div>
				{children}
			</div>
		</div>
	);
}
