"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BedDouble, House, BriefcaseBusiness } from "lucide-react";

/**
 * HA
 */
import { useWebSocketContext } from "@app/haProvider/WebSocketProvider";

/**
 * Hero UI
 */
import { Avatar, AvatarGroup } from "@heroui/react";

/**
 * Tabs config
 */
const tabs = [
	{
		id: "home",
		label: "Home",
		icon: <House size={18} />,
	},
	{
		id: "room",
		label: "Quarto",
		icon: <BedDouble size={18} />,
	},
	{
		id: "work",
		label: "Trabalho",
		icon: <BriefcaseBusiness size={18} />,
	},
];

/**
 * Component
 */
export default function FluidTabs() {
	const [activeTab, setActiveTab] = useState("home");
	const [touchedTab, setTouchedTab] = useState<string | null>(null);
	const [prevActiveTab, setPrevActiveTab] = useState("home");
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const { getState } = useWebSocketContext();
	const { state: magoiaMonitor } = getState("switch.monitor_goia");
	const { state: leticiaMonitor } = getState("switch.monitor_leticia");

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleTabClick = (tabId: string) => {
		setPrevActiveTab(activeTab);
		setActiveTab(tabId);
		setTouchedTab(tabId);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			setTouchedTab(null);
		}, 300);
	};

	const getTabIndex = (tabId: string) => tabs.findIndex((tab) => tab.id === tabId);

	return (
		<div className="grid grid-cols-[270px_540px_214px] items-center">
			{/* Coluna da esquerda: Avatares alinhados à direita */}
			<div className="flex items-center justify-end">
				<AvatarGroup isBordered>
					<Avatar
						src="/images/let_avatar.jpg"
						color="secondary"
						isDisabled={leticiaMonitor !== "on"}
					/>
					<Avatar
						src="/images/goia_avatar.jpg"
						color="primary"
						isDisabled={magoiaMonitor !== "on"}
					/>
				</AvatarGroup>
			</div>

			{/* Coluna do meio: Menu centralizado */}
			<div className="flex items-center justify-center py-4">
				<div className="relative flex w-full max-w-md space-x-2 overflow-hidden rounded-full bg-[#f5f1eb] shadow-lg dark:bg-background/80 backdrop-blur-md backdrop-saturate-150 transition-transform-background motion-reduce:transition-none">
					<AnimatePresence initial={false}>
						<motion.div
							key={activeTab}
							className="absolute inset-y-0 my-1 rounded-full bg-white"
							initial={{ x: `${getTabIndex(prevActiveTab) * 100}%` }}
							animate={{ x: `${getTabIndex(activeTab) * 100}%` }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							style={{ width: `${100 / tabs.length}%` }}
						/>
					</AnimatePresence>
					{tabs.map((tab) => (
						<motion.button
							key={tab.id}
							className={`relative z-10 flex w-full items-center justify-center gap-1.5 px-5 py-3 text-sm font-bold transition-colors duration-300 ${
								activeTab === tab.id ? "font-bold text-black" : "text-gray-500"
							} ${touchedTab === tab.id ? "blur-sm" : ""}`}
							onClick={() => handleTabClick(tab.id)}
						>
							{tab.icon}
							{tab.label}
						</motion.button>
					))}
				</div>
			</div>

			{/* Coluna da direita: Placeholder para equilibrar o grid */}
			<div className="flex justify-start m-4">
				<div className="w-10" />
			</div>
		</div>
	);
}
