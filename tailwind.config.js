// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// ...
		// make sure it's pointing to the ROOT node_module
		"./src/**/*.{js,ts,jsx,tsx,mdx,scss}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [heroui()],
};
