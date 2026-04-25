import type { Workspace } from "@/features/workspace/types/workspace-types";

export function resolveWorkspaceUrl(workspace: Workspace) {
  return workspace.url;
}
