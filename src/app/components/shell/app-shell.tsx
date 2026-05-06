import { useEffect } from "react";
import { AppTitleBar } from "@/app/components/title-bar/app-title-bar";
import { AgentControlPanel } from "@/features/agent/ui/panels/agent-control-panel";
import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { RuntimeCard } from "@/features/runtime/components/cards/runtime-card";
import { BrowserWorkspaceFrame } from "@/features/workspace/components/browser/browser-workspace-frame";
import { WorkspaceSidebar } from "@/features/workspace/components/sidebar/workspace-sidebar";

export function AppShell() {
  const locale = useLayoutStore((state) => state.locale);
  const workspaceSidebarVisible = useLayoutStore(
    (state) => state.workspaceSidebarVisible,
  );
  const inspectorVisible = useLayoutStore((state) => state.inspectorVisible);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="min-h-screen bg-app-bg text-app-fg">
      <div className="grid min-h-screen grid-rows-[max-content_1fr]">
        <AppTitleBar />

        <div
          className={
            workspaceSidebarVisible
              ? "grid min-h-0 grid-cols-[240px_1fr]"
              : "grid min-h-0 grid-cols-1"
          }
        >
          {workspaceSidebarVisible ? <WorkspaceSidebar /> : null}

          <section className="flex min-w-0 flex-col">
            <div
              className={
                inspectorVisible
                  ? "grid flex-1 grid-cols-[1fr_360px] gap-4"
                  : "grid flex-1 grid-cols-1"
              }
            >
              <BrowserWorkspaceFrame />

              {inspectorVisible ? (
                <div className="space-y-4">
                  <AgentControlPanel />
                  <RuntimeCard />
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
