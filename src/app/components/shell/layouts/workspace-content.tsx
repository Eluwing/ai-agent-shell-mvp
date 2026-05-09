import { AgentControlPanel } from "@/features/agent/ui/panels/agent-control-panel";
import { RuntimeCard } from "@/features/runtime/components/cards/runtime-card";
import { BrowserWorkspaceFrame } from "@/features/workspace/components/browser/browser-workspace-frame";

type WorkspaceContentProps = {
  inspectorVisible: boolean;
};

export function WorkspaceContent({
  inspectorVisible,
}: WorkspaceContentProps) {
  return (
    <section className="flex flex-1 min-h-0 min-w-0 flex-col">
      <div
        className={
          inspectorVisible
            ? "grid flex-1 min-h-0 grid-cols-workspace-inspector gap-layout-gutter"
            : "grid flex-1 min-h-0 grid-cols-1"
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
  );
}
