import type { AgentPreviewResult } from "@/features/agent/preview/types/preview-types";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

type PreviewResultCardProps = {
  result: AgentPreviewResult | null;
};

export function PreviewResultCard({ result }: PreviewResultCardProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border border-[color:var(--card-border)] bg-[color:var(--card-background)] p-3 text-sm text-[color:var(--card-foreground)]">
      {result
        ? t("agent.previewResult", {
            workspace: result.workspaceName,
          })
        : t("agent.waiting")}
    </div>
  );
}
