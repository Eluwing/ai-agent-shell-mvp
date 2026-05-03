import { useAgentRuns } from "@/features/agent/runs/hooks/use-agent-runs";

export function AgentRunStatus() {
  const { status } = useAgentRuns();

  return <span>{status}</span>;
}
