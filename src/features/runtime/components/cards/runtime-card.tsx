import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useRuntimeVersions } from "@/features/runtime/hooks/use-runtime-versions";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

export function RuntimeCard() {
  const versions = useRuntimeVersions();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("runtime.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-[color:var(--card-foreground)]/80">
        <p>Electron: {versions?.electron ?? "-"}</p>
        <p>Chrome: {versions?.chrome ?? "-"}</p>
        <p>Node: {versions?.node ?? "-"}</p>
        <p>{t("runtime.sqlite")}</p>
        <p>{t("runtime.openai")}</p>
      </CardContent>
    </Card>
  );
}
