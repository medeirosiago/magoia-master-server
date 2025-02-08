	"use client";

	import React from "react";
	import Lottie from "react-lottie";

	interface LottieIconProps {
		animationData: any;
		styles?: any;
		loop?: boolean;
		autoplay?: boolean;
	}

	export default function LottieIcon({
		animationData,
		styles,
		loop = true,
		autoplay = true,
	}: LottieIconProps) {
		const defaultOptions = {
			loop,
			autoplay,
			animationData,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid meet",
			},
		};

		return (
			<div className="w-full h-full flex justify-center items-center">
				<Lottie options={defaultOptions} style={{ width: "100%", height: "100%", ...styles }} />
			</div>
		);
	}
