import type { Workspace } from "@/features/workspace/types/workspace-types";
import { WORKSPACE_SEEDS } from "@/features/workspace/constants/workspace-seeds";

export const defaultWorkspaces: Workspace[] = WORKSPACE_SEEDS.map((seed) => ({
  ...seed,
  sessionPartition: `persist:workspace-${seed.id}`,
}));
