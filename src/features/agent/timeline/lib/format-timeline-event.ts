import type { TimelineEvent } from "@/features/agent/timeline/types/timeline-types";

export function formatTimelineEvent(event: TimelineEvent) {
  return `[${event.type}] ${event.message}`;
}
