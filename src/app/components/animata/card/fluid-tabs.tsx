"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BedDouble, House, BriefcaseBusiness, RefreshCw } from "lucide-react";
import { useWebSocketContext } from "@app/haProvider/WebSocketProvider";
import { Avatar, AvatarGroup, Button } from "@heroui/react";

const tabs = [
	{ id: "home", label: "Home", icon: <House size={18} /> },
	{ id: "room", label: "Quarto", icon: <BedDouble size={18} /> },
	{ id: "work", label: "Trabalho", icon: <BriefcaseBusiness size={18} /> },
];

export default function FluidTabs() {
	const [activeTab, setActiveTab] = useState("home");
	const [touchedTab, setTouchedTab] = useState<string | null>(null);
	const [prevActiveTab, setPrevActiveTab] = useState("home");
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const { getState } = useWebSocketContext();

	// Obtendo estados do Home Assistant
	const magoiaMonitorState = getState("switch.monitor_goia")?.state;
	const leticiaMonitorState = getState("switch.monitor_leticia")?.state;

	// Limpa o timeout quando o componente desmontar
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	// Atualiza a aba ativa apenas se necessário
	const handleTabClick = useCallback(
		(tabId: string) => {
			if (tabId !== activeTab) {
				setPrevActiveTab(activeTab);
				setActiveTab(tabId);
			}

			setTouchedTab(tabId);

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => setTouchedTab(null), 300);
		},
		[activeTab] // Garante que o `useCallback` só recria a função se `activeTab` mudar
	);

	// Obtém índice da aba para animação
	const getTabIndex = (tabId: string) => tabs.findIndex((tab) => tab.id === tabId);

	// Função para recarregar a página
	const handleReload = () => {
		window.location.reload();
	};

	return (
		<div className="grid grid-cols-[270px_540px_214px] items-center">
			{/* Avatares alinhados à direita */}
			<div className="flex items-center justify-end">
				<AvatarGroup isBordered>
					<Avatar src="/images/let_avatar.jpg" color="secondary" isDisabled={leticiaMonitorState !== "on"} />
					<Avatar src="/images/goia_avatar.jpg" color="primary" isDisabled={magoiaMonitorState !== "on"} />
				</AvatarGroup>
			</div>

			{/* Menu centralizado */}
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

			{/* Botão de recarregar a página alinhado à direita */}
			<div className="flex justify-end m-4">
				<Button
					onPress={handleReload}
					color="primary"
					variant="shadow"
					radius="full"
					className="flex items-center gap-2"
				>
					<RefreshCw size={18} />
					Recarregar
				</Button>
			</div>
		</div>
	);
}
