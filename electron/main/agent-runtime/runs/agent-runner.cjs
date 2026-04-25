const { runAgent } = require("./run-agent.cjs");

function createAgentRunner() {
  return {
    runAgent,
  };
}

module.exports = {
  createAgentRunner,
};
