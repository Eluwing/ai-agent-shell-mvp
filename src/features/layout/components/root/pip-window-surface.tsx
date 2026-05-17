import { AgentActivityPanel } from "@/features/agent/ui/activity/agent-activity-panel";
import { PipTitleBar } from "@/features/layout/components/title-bar/pip-title-bar";

export function PipWindowSurface() {
  return (
    <main className="grid min-h-screen grid-rows-app-shell bg-app-bg text-app-fg">
      <PipTitleBar />
      <section className="grid min-h-0 grid-cols-pip-browser-activity">
        <div aria-hidden="true" />
        <div className="h-full min-h-0 border-l border-shell-border bg-card">
          <AgentActivityPanel />
        </div>
      </section>
    </main>
  );
}
