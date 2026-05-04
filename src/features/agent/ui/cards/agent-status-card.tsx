import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function AgentStatusCard() {
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const { t } = useTranslation();

  return (
    <div className="rounded-md bg-card p-3 text-sm text-card-fg">
      <p className="text-xs text-card-fg/70">
        {t("agent.currentMode")}
      </p>
      <p className="mt-1 font-medium">{layoutMode}</p>
    </div>
  );
}
