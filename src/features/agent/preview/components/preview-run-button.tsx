import { Play } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";

type PreviewRunButtonProps = {
  onRun: () => void;
};

export function PreviewRunButton({ onRun }: PreviewRunButtonProps) {
  const { t } = useTranslation();

  return (
    <Button className="w-full" onClick={onRun}>
      <Play className="size-4" />
      {t("agent.runPreview")}
    </Button>
  );
}
