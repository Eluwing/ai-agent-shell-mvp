import type {
  OpenWorkspaceInput,
  OpenWorkspaceResult,
} from "@/shared/ipc/contracts/workspace-contract";

export async function createWorkspaceView(
  input: OpenWorkspaceInput,
): Promise<OpenWorkspaceResult | undefined> {
  return window.agentShell?.workspace.open(input);
}
