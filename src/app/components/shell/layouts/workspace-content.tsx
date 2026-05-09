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
  );
}
