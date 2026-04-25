export function toOpenAIToolName(toolName: string) {
  return toolName.replaceAll(".", "_");
}
