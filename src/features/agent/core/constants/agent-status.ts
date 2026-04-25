import type { AgentStatus } from "@/features/agent/core/types/agent-types";

export const agentStatuses: AgentStatus[] = [
  "idle",
  "running",
  "paused",
  "failed",
  "completed",
];
