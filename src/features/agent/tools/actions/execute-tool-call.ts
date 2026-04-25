import type { ToolCall } from "@/features/agent/tools/types/tool-types";

export async function executeToolCall(toolCall: ToolCall) {
  return {
    ...toolCall,
    status: "succeeded" as const,
  };
}
