import { create } from "zustand";

type LayoutMode = "native" | "pip" | "split";

type AgentStore = {
  layoutMode: LayoutMode;
  activeWorkspace: string;
  setLayoutMode: (mode: LayoutMode) => void;
  setActiveWorkspace: (workspace: string) => void;
};

export const useAgentStore = create<AgentStore>((set) => ({
  layoutMode: "native",
  activeWorkspace: "CMS",
  setLayoutMode: (layoutMode) => set({ layoutMode }),
  setActiveWorkspace: (activeWorkspace) => set({ activeWorkspace }),
}));
