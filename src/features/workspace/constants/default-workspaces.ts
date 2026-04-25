import type { Workspace } from "@/features/workspace/types/workspace-types";

export const defaultWorkspaces: Workspace[] = [
  {
    id: "cms",
    name: "CMS",
    kind: "cms",
    url: "https://example.com/cms",
    sessionPartition: "persist:workspace-cms",
  },
  {
    id: "crm",
    name: "CRM",
    kind: "crm",
    url: "https://example.com/crm",
    sessionPartition: "persist:workspace-crm",
  },
  {
    id: "admin",
    name: "Admin",
    kind: "admin",
    url: "https://example.com/admin",
    sessionPartition: "persist:workspace-admin",
  },
];
