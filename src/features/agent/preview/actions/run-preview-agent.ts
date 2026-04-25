import { createPreviewGraph } from "@/features/agent/preview/lib/preview-graph";
import type { AgentPreviewResult } from "@/features/agent/preview/types/preview-types";
import type { Workspace } from "@/features/workspace/types/workspace-types";

export async function runPreviewAgent(
  workspace: Workspace,
): Promise<AgentPreviewResult> {
  const graph = createPreviewGraph();
  const result = await graph.invoke({ goal: workspace.name });

  return {
    workspaceName: String(result.goal ?? workspace.name),
  };
}
