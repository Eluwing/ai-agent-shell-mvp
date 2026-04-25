import type {
  StartAgentRunInput,
  StartAgentRunResult,
} from "@/shared/ipc/contracts/agent-contract";

export async function createAgentRun(
  input: StartAgentRunInput,
): Promise<StartAgentRunResult | undefined> {
  return window.agentShell?.agent.startRun(input);
}
