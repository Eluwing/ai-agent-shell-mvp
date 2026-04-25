import { create } from "zustand";
import type { AgentStatus } from "@/features/agent/core/types/agent-types";

type AgentStore = {
  activeRunId: string | null;
  status: AgentStatus;
  setActiveRunId: (runId: string | null) => void;
  setStatus: (status: AgentStatus) => void;
};

export const useAgentStore = create<AgentStore>((set) => ({
  activeRunId: null,
  status: "idle",
  setActiveRunId: (activeRunId) => set({ activeRunId }),
  setStatus: (status) => set({ status }),
}));
