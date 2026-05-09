import type { Workspace } from "@/features/workspace/types/workspace-types";

export async function openWorkspace(workspace: Workspace) {
  return window.agentShell?.workspace.open({
    workspaceId: workspace.id,
    url: workspace.url,
  });
}
