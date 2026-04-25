import { useAgentPreview } from "@/features/agent/preview/hooks/use-agent-preview";
import { PreviewResultCard } from "@/features/agent/preview/components/preview-result-card";
import { PreviewRunButton } from "@/features/agent/preview/components/preview-run-button";
import { AgentStatusCard } from "@/features/agent/ui/agent-status-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function AgentControlPanel() {
  const { result, runPreview } = useAgentPreview();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("agent.control")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <AgentStatusCard />
        <PreviewRunButton onRun={runPreview} />
        <PreviewResultCard result={result} />
      </CardContent>
    </Card>
  );
}
