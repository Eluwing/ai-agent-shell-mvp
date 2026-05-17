import { BrowserRegion } from "@/features/layout/components/regions/browser-region";
import { AgentActivityRegion } from "@/features/layout/components/regions/agent-activity-region";
import { PipTitleBar } from "@/features/layout/components/title-bar/pip-title-bar";

export function PipLayout() {
  return (
    <div className="grid flex-1 min-h-0 grid-rows-app-shell">
      <PipTitleBar />
      <section className="grid min-h-0 min-w-0 grid-cols-pip-browser-activity gap-layout-gutter">
        <BrowserRegion />
        <AgentActivityRegion />
      </section>
    </div>
  );
}
