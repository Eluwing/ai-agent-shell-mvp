import { useMemo } from "react";
import type { TimelineEvent } from "@/features/agent/timeline/types/timeline-types";

export function useAgentTimeline(events: TimelineEvent[] = []) {
  return useMemo(() => events, [events]);
}
