export type TimelineEventType =
  | "plan"
  | "observation"
  | "tool_call"
  | "approval"
  | "result"
  | "error";

export type TimelineEvent = {
  id: string;
  runId: string;
  type: TimelineEventType;
  message: string;
  createdAt: number;
};
