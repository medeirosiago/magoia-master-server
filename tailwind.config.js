// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// ...
		// make sure it's pointing to the ROOT node_module
		"./src/**/*.{js,ts,jsx,tsx,mdx,css}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				meteor: {
					"0%": { transform: "translateY(-20%) translateX(-50%)" },
					"100%": { transform: "translateY(300%) translateX(-50%)" },
				},
				boxShadow: {
					glow: "0 0 20px rgba(255, 204, 112, 0.7), 0 0 40px rgba(200, 80, 192, 0.5), 0 0 60px rgba(65, 88, 208, 0.3)",
					glow2: "0 0 20px rgba(50, 255, 50, 0.7), 0 0 40px rgba(20, 200, 20, 0.5), 0 0 60px rgba(5, 150, 5, 0.3)",
				},
				filter: {
					"blur-20": "blur(20px)",
					"blur-25": "blur(25px)",
				},
				brightness: {
					150: "1.5",
				},
			},
			animation: {
				meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
			},
		},
	},
	darkMode: "class",
	plugins: [heroui(), require("tailwindcss-animate")],
};
