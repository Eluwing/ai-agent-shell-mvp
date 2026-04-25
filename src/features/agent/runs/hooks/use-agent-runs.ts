import { useAgentStore } from "@/features/agent/core/stores/agent-store";

export function useAgentRuns() {
  const activeRunId = useAgentStore((state) => state.activeRunId);
  const status = useAgentStore((state) => state.status);

  return {
    activeRunId,
    status,
  };
}
