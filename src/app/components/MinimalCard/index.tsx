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
					"flex w-fit h-fit transition-all duration-200 ease-in-out",
					isMinimal ? "w-80 h-80 items-center justify-center" : "w-fit",
				)}
			>
				<div
					className={cn(
						"relative transition-all duration-300 ease-in-out transform",
						isMinimal ? "scale-75" : "scale-100",
					)}
					onMouseDown={handleLongPressStart}
					onMouseUp={handleLongPressEnd}
					onTouchStart={handleLongPressStart}
					onTouchEnd={handleLongPressEnd}
					onContextMenu={(e) => e.preventDefault()}
				>
					{isMinimal ? (
						<Card
							className="minimal-climate-card"
							radius="lg"
							shadow="md"
							style={{
								boxShadow: `5px 5px 20px ${props.isOn ? "green" : "red"}`,
							}}
						>
							<CardBody>
								<LottieIcon
									animationData={props.icon}
									styles={{
										filter: props.isOn
											? "saturate(2) drop-shadow(0 0 3px green)"
											: "brightness(0.5) drop-shadow(0 0 3px red)",
									}}
								/>
							</CardBody>
						</Card>
					) : (
						<WrappedComponent {...props} />
					)}
				</div>
			</div>
		);
	};
}
