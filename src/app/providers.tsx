"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Render children without ThemeProvider during SSR
  }

  return (
    <NextUIProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </NextUIProvider>
  ); // Wrap children with ThemeProvider after mount
}
