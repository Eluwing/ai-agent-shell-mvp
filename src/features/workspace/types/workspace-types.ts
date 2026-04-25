export type WorkspaceKind = "cms" | "crm" | "admin";

export type Workspace = {
  id: string;
  name: string;
  kind: WorkspaceKind;
  url: string;
  sessionPartition: string;
};
