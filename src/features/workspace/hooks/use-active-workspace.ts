import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";

export function useActiveWorkspace() {
  const activeWorkspaceId = useWorkspaceStore((state) => state.activeWorkspaceId);
  const workspaces = useWorkspaceStore((state) => state.workspaces);

  return (
    workspaces.find((workspace) => workspace.id === activeWorkspaceId) ??
    workspaces[0]
  );
}
