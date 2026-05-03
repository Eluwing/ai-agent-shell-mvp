import { create } from "zustand";
import { defaultWorkspaces } from "@/features/workspace/constants/default-workspaces";
import type { Workspace } from "@/features/workspace/types/workspace-types";

type WorkspaceStore = {
  activeWorkspaceId: Workspace["id"];
  workspaces: Workspace[];
  setActiveWorkspace: (workspaceId: Workspace["id"]) => void;
  addWorkspace: () => void;
  closeWorkspace: (workspaceId: Workspace["id"]) => void;
};

let workspaceSequence = defaultWorkspaces.length + 1;

function createWorkspace(): Workspace {
  const sequence = workspaceSequence;
  workspaceSequence += 1;

  const id = `workspace-${sequence}`;

  return {
    id,
    name: `Tab ${sequence}`,
    kind: "cms",
    url: "about:blank",
    sessionPartition: `persist:${id}`,
  };
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeWorkspaceId: defaultWorkspaces[0].id,
  workspaces: defaultWorkspaces,
  setActiveWorkspace: (activeWorkspaceId) => set({ activeWorkspaceId }),
  addWorkspace: () =>
    set((state) => {
      const workspace = createWorkspace();

      return {
        activeWorkspaceId: workspace.id,
        workspaces: [...state.workspaces, workspace],
      };
    }),
  closeWorkspace: (workspaceId) =>
    set((state) => {
      if (state.workspaces.length <= 1) {
        return state;
      }

      const nextWorkspaces = state.workspaces.filter(
        (workspace) => workspace.id !== workspaceId,
      );

      if (nextWorkspaces.length === 0) {
        return state;
      }

      if (state.activeWorkspaceId !== workspaceId) {
        return { workspaces: nextWorkspaces };
      }

      const removedIndex = state.workspaces.findIndex(
        (workspace) => workspace.id === workspaceId,
      );
      const nextActiveWorkspace =
        nextWorkspaces[removedIndex] ??
        nextWorkspaces[removedIndex - 1] ??
        nextWorkspaces[0];

      return {
        activeWorkspaceId: nextActiveWorkspace.id,
        workspaces: nextWorkspaces,
      };
    }),
}));
