import { useEffect } from "react";
import { AgentControlPanel } from "@/features/agent/ui/agent-control-panel";
import { LayoutModeToolbar } from "@/features/layout/components/layout-mode-toolbar";
import { LanguageSwitcher } from "@/features/layout/components/language-switcher";
import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { RuntimeCard } from "@/features/runtime/components/runtime-card";
import { BrowserWorkspaceFrame } from "@/features/workspace/components/browser-workspace-frame";
import { WorkspaceSidebar } from "@/features/workspace/components/workspace-sidebar";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function AppShell() {
  const locale = useLayoutStore((state) => state.locale);
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="grid min-h-screen grid-cols-[240px_1fr]">
        <WorkspaceSidebar />

        <section className="flex min-w-0 flex-col">
          <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-5">
            <div>
              <p className="text-sm font-medium">Platform Agent</p>
              <p className="text-xs text-zinc-500">{t("app.subtitle")}</p>
            </div>

            <div className="flex items-center gap-2">
              <LayoutModeToolbar />
              <LanguageSwitcher />
            </div>
          </header>

          <div className="grid flex-1 grid-cols-[1fr_360px] gap-4 p-5">
            <BrowserWorkspaceFrame />

            <div className="space-y-4">
              <AgentControlPanel />
              <RuntimeCard />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
