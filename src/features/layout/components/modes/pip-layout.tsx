import { BrowserRegion } from "@/features/layout/components/regions/browser-region";
import { AgentRegion } from "@/features/layout/components/regions/agent-region";
import { PipRegion } from "@/features/layout/components/regions/pip-region";
import { AppTitleBar } from "@/features/layout/components/title-bar/app-title-bar";

type PipLayoutProps = {
  agentPanelVisible: boolean;
};

export function PipLayout({ agentPanelVisible }: PipLayoutProps) {
  return (
    <div className="grid flex-1 min-h-0 grid-rows-app-shell">
      <AppTitleBar />
      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <BrowserRegion
          viewportClassName={
            agentPanelVisible ? "mr-pip-agent-panel-space" : undefined
          }
        />
        {agentPanelVisible ? (
          <PipRegion>
            <AgentRegion />
          </PipRegion>
        ) : null}
      </section>
    </div>
  );
}
