import { Button } from "@/shared/components/ui/button";
import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";

export function WorkspaceSwitcher() {
  const activeWorkspaceId = useWorkspaceStore((state) => state.activeWorkspaceId);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const setActiveWorkspace = useWorkspaceStore((state) => state.setActiveWorkspace);

  return (
    <nav className="mt-8 space-y-2">
      {workspaces.map((workspace) => (
        <Button
          key={workspace.id}
          className="w-full justify-start"
          variant={activeWorkspaceId === workspace.id ? "default" : "secondary"}
          onClick={() => setActiveWorkspace(workspace.id)}
        >
          {workspace.name}
        </Button>
      ))}
    </nav>
  );
}
