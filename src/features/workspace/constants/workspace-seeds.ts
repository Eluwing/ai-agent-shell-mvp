import type { WorkspaceKind } from "@/features/workspace/types/workspace-types";

export type WorkspaceSeed = {
  id: string;
  name: string;
  kind: WorkspaceKind;
  url: string;
};

export const WORKSPACE_SEEDS: WorkspaceSeed[] = [
  {
    id: "cms",
    name: "CMS",
    kind: "cms",
    url: "https://www.google.com",
  },
  {
    id: "crm",
    name: "CRM",
    kind: "crm",
    url: "https://www.google.com",
  },
  {
    id: "admin",
    name: "Admin",
    kind: "admin",
    url: "https://www.google.com",
  },
];
