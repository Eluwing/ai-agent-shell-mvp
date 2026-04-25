import { create } from "zustand";
import { defaultWorkspaces } from "@/features/workspace/constants/default-workspaces";
import type { Workspace } from "@/features/workspace/types/workspace-types";

type WorkspaceStore = {
  activeWorkspaceId: Workspace["id"];
  workspaces: Workspace[];
  setActiveWorkspace: (workspaceId: Workspace["id"]) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeWorkspaceId: defaultWorkspaces[0].id,
  workspaces: defaultWorkspaces,
  setActiveWorkspace: (activeWorkspaceId) => set({ activeWorkspaceId }),
}));
