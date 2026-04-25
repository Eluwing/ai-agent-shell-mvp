import type { TimelineEvent } from "@/features/agent/timeline/types/timeline-types";

export function groupTimelineEvents(events: TimelineEvent[]) {
  return events.reduce<Record<string, TimelineEvent[]>>((groups, event) => {
    groups[event.runId] = groups[event.runId] ?? [];
    groups[event.runId].push(event);
    return groups;
  }, {});
}
