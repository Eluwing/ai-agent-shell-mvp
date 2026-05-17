import { PictureInPicture2 } from "lucide-react";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { ToolbarSegment } from "./toolbar-segment";

type PipModeButtonProps = {
  active?: boolean;
  onClick?: () => void;
};

export function PipModeButton({
  active = false,
  onClick,
}: PipModeButtonProps) {
  const { t } = useTranslation();

  return (
    <ToolbarSegment
      active={active}
      ariaLabel={t("layout.pip")}
      onClick={onClick}
      icon={<PictureInPicture2 />}
    />
  );
}
