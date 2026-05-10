import { Pin } from "lucide-react";
import { useAgentStore } from "@/features/agent/core/stores/agent-store";
import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { AgentActivityItem } from "./agent-activity-item";

export function AgentActivityPanel() {
  const status = useAgentStore((state) => state.status);
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const { t } = useTranslation();
  const hasActiveRun = status === "running" || status === "paused";

  return (
    <section className="h-full min-h-0 overflow-hidden bg-card px-3 py-3 text-card-fg">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-xs font-medium text-card-fg/70">
          {t("agent.activity.title")}
        </h2>
        <Pin className="size-3.5 text-card-fg/60" aria-hidden="true" />
      </div>

      <ol className="space-y-2">
        <AgentActivityItem
          complete
          label={t("agent.activity.browserReady")}
        />
        <AgentActivityItem
          complete={hasActiveRun || status === "completed"}
          active={!hasActiveRun && status !== "completed"}
          label={t("agent.activity.waiting")}
        />
        <AgentActivityItem
          complete={status === "completed"}
          active={hasActiveRun}
          label={
            hasActiveRun
              ? t("agent.activity.running")
              : t("agent.activity.currentMode", { mode: layoutMode })
          }
        />
      </ol>
    </section>
  );
}
