async function executeAgentTool(toolCall) {
  return {
    ...toolCall,
    status: "succeeded",
  };
}

module.exports = {
  executeAgentTool,
};
