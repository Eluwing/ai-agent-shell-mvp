export async function stopAgentRun(runId: string) {
  return { runId, stopped: true };
}
