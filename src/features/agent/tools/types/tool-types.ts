export type ToolCallStatus = "pending" | "running" | "succeeded" | "failed";

export type ToolCall = {
  id: string;
  name: string;
  input: unknown;
  status: ToolCallStatus;
};
