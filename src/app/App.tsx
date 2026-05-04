import { useLayoutEffect } from "react";
import { AppShell } from "@/app/components/shell/app-shell";
import { Providers } from "@/app/providers/providers";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function App() {
  const themeMode = useLayoutStore((state) => state.themeMode);

  useLayoutEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = themeMode;
    root.classList.toggle("dark", themeMode === "dark");
    root.style.colorScheme = themeMode;

    try {
      window.localStorage.setItem("ai-agent-mock-theme-mode", themeMode);
    } catch {
      // Ignore storage failures and keep the current theme in memory.
    }
  }, [themeMode]);

  return (
    <Providers>
      <AppShell />
    </Providers>
  );
}
