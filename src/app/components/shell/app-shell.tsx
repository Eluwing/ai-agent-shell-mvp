import { useEffect } from "react";
import { AppMainLayout } from "@/features/layout/components/root/app-main-layout";
import { useLayoutStore } from "@/features/layout/stores/layout-store";

export function AppShell() {
  const locale = useLayoutStore((state) => state.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="flex min-h-screen flex-col bg-app-bg text-app-fg">
      <AppMainLayout />
    </main>
  );
}
