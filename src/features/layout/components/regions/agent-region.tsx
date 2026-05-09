import { AgentControlPanel } from "@/features/agent/ui/panels/agent-control-panel";
import { RuntimeCard } from "@/features/runtime/components/cards/runtime-card";

export function AgentRegion() {
  return (
    <aside className="space-y-4">
      <AgentControlPanel />
      <RuntimeCard />
    </aside>
  );
}
