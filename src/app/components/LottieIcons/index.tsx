"use client";

import React from "react";
import Lottie from "react-lottie";

interface LottieIconProps {
	animationData: any;
	styles?: any;
}

export default function LottieIcon({ animationData, styles }: LottieIconProps) {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid meet", // Alterado para "meet" para encaixar no container
		},
	};

	return (
		<div className="w-full h-full flex justify-center items-center">
			<Lottie options={defaultOptions} style={{ width: "100%", height: "100%", ...styles }} />
		</div>
	);
}
