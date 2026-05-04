import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function AgentStatusCard() {
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const { t } = useTranslation();

  return (
    <div className="rounded-md bg-[color:var(--card-background)] p-3 text-sm text-[color:var(--card-foreground)]">
      <p className="text-xs text-[color:var(--card-foreground)]/70">
        {t("agent.currentMode")}
      </p>
      <p className="mt-1 font-medium">{layoutMode}</p>
    </div>
  );
}
