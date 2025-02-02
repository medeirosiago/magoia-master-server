"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Components
 */
import FibonacciLines from "../container/fibonacci-lines";

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

function useGridCount() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [count, setCount] = useState(0);

	useEffect(() => {
		const updateCount = () => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) {
				return;
			}
			const width = rect.width;
			const cellSize = 40;
			setCount(Math.ceil(width / cellSize));
		};

		updateCount();

		// Can be debounced if needed
		window.addEventListener("resize", updateCount);
		return () => window.removeEventListener("resize", updateCount);
	}, []);

	return {
		count,
		containerRef,
	};
}

function Background() {
	const { count, containerRef } = useGridCount();

	return (
		<div
			ref={containerRef}
		
			style={{
				background:
					"linear-gradient(180deg, rgba(78,88,167,1) 0%, rgba(108,128,197,1) 50%, rgba(137,158,209,1) 70%, rgba(175,191,225,1) 89%)",
			}}
				className="-z-1 absolute inset-0 flex h-full w-full flex-row justify-between dark:bg-background/80"
		>
			<div
				// style={{
				// 	background:
				// 		"radial-gradient(50% 50% at 50% 50%,#072a39 0%,rgba(78,88,167,1) 50%,rgba(7,42,57,0) 100%)",
				// }}
				className="absolute inset-0 top-1/2 h-full w-full rounded-full opacity-40"
			/>
			{/* 
			<div className="pointer-events-none absolute inset-0 z-0 flex items-end justify-center pb-14">
				<FibonacciLines className="w-full" />
			</div> */}
			{Array.from({ length: count }, (_, i) => (
				<div key={i} className="relative h-full w-px rotate-0">
					{(1 + i) % 4 === 0 && <Beam index={i + 1} />}
				</div>
			))}
		</div>
	);
}

export default function AnimatedBeam({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				// Torna o container “relativo” para que o bg absoluto encaixe dentro
				// Faz a altura mínima igual à da tela
				// Adiciona padding de 6px
				"relative min-h-screen p-[6px] overflow-hidden",
				className,
			)}
		>
			<Background />

			<div className="relative h-full w-full">{children}</div>
		</div>
	);
}
