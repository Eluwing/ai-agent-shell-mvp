import type { Workspace } from "@/features/workspace/types/workspace-types";

export type OpenWorkspaceInput = {
  workspaceId: Workspace["id"];
  url: string;
};

export type OpenWorkspaceResult = {
  workspaceId: Workspace["id"];
  opened: boolean;
};

export type WorkspaceViewBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SetWorkspaceViewBoundsInput = {
  workspaceId: Workspace["id"];
  bounds: WorkspaceViewBounds;
};

export type NavigateWorkspaceBackInput = {
  workspaceId: Workspace["id"];
};

export type NavigateWorkspaceForwardInput = {
  workspaceId: Workspace["id"];
};

export type ReloadWorkspaceInput = {
  workspaceId: Workspace["id"];
};

export type WorkspaceNavigationState = {
  workspaceId: Workspace["id"];
  currentUrl: string;
  canGoBack: boolean;
  canGoForward: boolean;
};
