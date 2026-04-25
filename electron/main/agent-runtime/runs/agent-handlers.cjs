const { ipcMain } = require("electron");
const { runAgent } = require("./run-agent.cjs");

function registerAgentHandlers() {
  ipcMain.handle("agent:start-run", async (_event, input) => {
    const result = await runAgent(input);
    return {
      runId: result.runId,
    };
  });
}

module.exports = {
  registerAgentHandlers,
};
