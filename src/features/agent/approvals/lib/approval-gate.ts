const riskyActionKeywords = ["delete", "submit", "send", "payment", "permission"];

export function requiresApproval(actionName: string) {
  return riskyActionKeywords.some((keyword) =>
    actionName.toLowerCase().includes(keyword),
  );
}
