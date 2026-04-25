import type { AgentStatus } from "@/features/agent/core/types/agent-types";

export type AgentRun = {
  id: string;
  goal: string;
  status: AgentStatus;
  workspaceId: string;
  createdAt: number;
};
