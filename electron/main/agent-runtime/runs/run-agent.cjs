async function runAgent(input) {
  return {
    runId: `run-${Date.now()}`,
    goal: input.goal,
    workspaceId: input.workspaceId,
  };
}

module.exports = {
  runAgent,
};
