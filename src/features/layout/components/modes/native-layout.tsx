import { BrowserRegion } from "@/features/layout/components/regions/browser-region";
import { AgentRegion } from "@/features/layout/components/regions/agent-region";
import { LeftSidebarRegion } from "@/features/layout/components/regions/left-sidebar-region";
import { AppTitleBar } from "@/features/layout/components/title-bar/app-title-bar";
import { WorkspaceTitleBar } from "@/features/layout/components/title-bar/workspace-title-bar";

type NativeLayoutProps = {
  agentPanelVisible: boolean;
  leftSidebarVisible: boolean;
};

export function NativeLayout({
  agentPanelVisible,
  leftSidebarVisible,
}: NativeLayoutProps) {
  const contentClassName = agentPanelVisible
    ? "grid flex-1 min-h-0 grid-cols-workspace-inspector gap-layout-gutter"
    : "grid flex-1 min-h-0 grid-cols-1";

  if (!leftSidebarVisible) {
    return (
      <div className="grid flex-1 min-h-0 grid-rows-app-shell">
        <AppTitleBar />
        <section className="flex flex-1 min-h-0 min-w-0 flex-col">
          <div className={contentClassName}>
            <BrowserRegion />
            {agentPanelVisible ? <AgentRegion /> : null}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="grid flex-1 min-h-0 grid-cols-workspace-sidebar grid-rows-app-shell">
      <LeftSidebarRegion />
      <WorkspaceTitleBar />
      <section className="flex flex-1 min-h-0 min-w-0 flex-col">
        <div className={contentClassName}>
          <BrowserRegion />
          {agentPanelVisible ? <AgentRegion /> : null}
        </div>
      </section>
    </div>
  );
}
