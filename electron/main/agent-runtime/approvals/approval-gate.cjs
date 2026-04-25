function requiresApproval(toolName) {
  return ["delete", "submit", "send", "payment", "permission"].some((keyword) =>
    toolName.toLowerCase().includes(keyword),
  );
}

module.exports = {
  requiresApproval,
};
