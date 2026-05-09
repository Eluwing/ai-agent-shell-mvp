import { WORKSPACE_KINDS } from "@/features/workspace/constants/workspace-kinds";

export type WorkspaceKind = (typeof WORKSPACE_KINDS)[number];

export type Workspace = {
  id: string;
  name: string;
  kind: WorkspaceKind;
  url: string;
  sessionPartition: string;
};
