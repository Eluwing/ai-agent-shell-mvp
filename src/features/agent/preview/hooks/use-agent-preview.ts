import { useState } from "react";
import { runPreviewAgent } from "@/features/agent/preview/actions/run-preview-agent";
import type { AgentPreviewResult } from "@/features/agent/preview/types/preview-types";
import { useAgentStore } from "@/features/agent/core/stores/agent-store";
import { useActiveWorkspace } from "@/features/workspace/hooks/use-active-workspace";

export function useAgentPreview() {
  const activeWorkspace = useActiveWorkspace();
  const setStatus = useAgentStore((state) => state.setStatus);
  const [result, setResult] = useState<AgentPreviewResult | null>(null);

  async function runPreview() {
    setStatus("running");
    const previewResult = await runPreviewAgent(activeWorkspace);
    setResult(previewResult);
    setStatus("completed");
  }

  return {
    result,
    runPreview,
  };
}
