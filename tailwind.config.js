// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// Certifique-se de que os caminhos estão corretos
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
				// Keyframes para o container de nuvens em scroll infinito
				cloudScroll: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
			animation: {
				meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
				// Animação do container de nuvens (scroll infinito)
				"cloud-scroll": "cloudScroll 60s linear infinite",
			},
		},
	},
	darkMode: "class",
	plugins: [heroui(), require("tailwindcss-animate")],
};
