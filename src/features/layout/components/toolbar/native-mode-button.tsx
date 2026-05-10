import { Monitor } from "lucide-react";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { ToolbarSegment } from "./toolbar-segment";

type NativeModeButtonProps = {
  active?: boolean;
  onClick: () => void;
};

export function NativeModeButton({
  active = false,
  onClick,
}: NativeModeButtonProps) {
  const { t } = useTranslation();

  return (
    <ToolbarSegment
      active={active}
      ariaLabel={t("layout.native")}
      onClick={onClick}
      icon={<Monitor />}
    />
  );
}
