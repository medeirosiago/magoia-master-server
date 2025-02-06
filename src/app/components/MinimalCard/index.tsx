"use client";

import React, { useState, useRef } from "react";

/**
 * Components
 */
import LottieIcon from "../LottieIcons";
import { Card, CardBody } from "@heroui/card";

/**
 * Utils
 */
import { cn } from "@/lib/utils";

/**
 * Types
 */
interface MinimalCardProps {
	icon?: any;
	isOn: boolean;
}

/**
 * MinimalCard Component
 */
export default function MinimalCard<T extends object>(WrappedComponent: React.ComponentType<T>) {
	return function (props: T & MinimalCardProps) {
		const [isMinimal, setIsMinimal] = useState(false);
		const timerRef = useRef<NodeJS.Timeout | null>(null);

		const handleLongPressStart = () => {
			timerRef.current = setTimeout(() => setIsMinimal((prev) => !prev), 300);
		};

		const handleLongPressEnd = () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};

		return (
			<div
				className={cn(
					"relative transition-transform-background motion-reduce:transition-none",
					isMinimal ? "w-[50px] h-[50px]" : "w-fit",
				)}
				onMouseDown={handleLongPressStart}
				onMouseUp={handleLongPressEnd}
				onTouchStart={handleLongPressStart}
				onTouchEnd={handleLongPressEnd}
				onContextMenu={(e) => e.preventDefault()}
			>
				{isMinimal ? (
					<Card className="minimal-climate-card" radius="lg" shadow="md" isBlurred>
						<CardBody>
							<LottieIcon
								animationData={props.icon}
								styles={{
									filter: props.isOn ? "saturate(2)" : "brightness(0.5)",
								}}
							/>
						</CardBody>
					</Card>
				) : (
					<WrappedComponent {...props} />
				)}
			</div>
		);
	};
}
