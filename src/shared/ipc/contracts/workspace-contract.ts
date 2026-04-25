import type { Workspace } from "@/features/workspace/types/workspace-types";

export type OpenWorkspaceInput = {
  workspaceId: Workspace["id"];
};

export type OpenWorkspaceResult = {
  workspaceId: Workspace["id"];
  opened: boolean;
};
