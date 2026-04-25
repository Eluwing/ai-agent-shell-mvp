import type { StartAgentRunInput } from "@/shared/ipc/contracts/agent-contract";

export async function startAgentRun(input: StartAgentRunInput) {
  return window.agentShell?.agent.startRun(input);
}
