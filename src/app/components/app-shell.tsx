import { useEffect } from "react";
import { AppTitleBar } from "@/app/components/app-title-bar";
import { AgentControlPanel } from "@/features/agent/ui/agent-control-panel";
import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { RuntimeCard } from "@/features/runtime/components/runtime-card";
import { BrowserWorkspaceFrame } from "@/features/workspace/components/browser-workspace-frame";
import { WorkspaceSidebar } from "@/features/workspace/components/workspace-sidebar";

export function AppShell() {
  const locale = useLayoutStore((state) => state.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="grid min-h-screen grid-rows-[48px_1fr]">
        <AppTitleBar />

        <div className="grid min-h-0 grid-cols-[240px_1fr]">
          <WorkspaceSidebar />

          <section className="flex min-w-0 flex-col">
            <div className="grid flex-1 grid-cols-[1fr_360px] gap-4 p-5">
              <BrowserWorkspaceFrame />

              <div className="space-y-4">
                <AgentControlPanel />
                <RuntimeCard />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
