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
			},
			animation: {
				meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
			},
		},
	},
	darkMode: "class",
	plugins: [heroui(), require("tailwindcss-animate")],
};
