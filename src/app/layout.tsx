import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
			<link href="./output.css" rel="stylesheet" />
			</head>
			<body>{children}</body>
		</html>
	);
}
