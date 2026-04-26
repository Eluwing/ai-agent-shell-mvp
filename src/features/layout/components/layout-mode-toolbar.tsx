import { Monitor, PanelRight, PictureInPicture2 } from "lucide-react";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { ToolbarGroup } from "./toolbar-group";
import { ToolbarSegment } from "./toolbar-segment";

type LayoutModeToolbarProps = {
  className?: string;
};

export function LayoutModeToolbar({ className }: LayoutModeToolbarProps) {
  const setLayoutMode = useLayoutStore((state) => state.setLayoutMode);
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const { t } = useTranslation();

  return (
    <ToolbarGroup className={className} density="compact">
      <ToolbarSegment
        active={layoutMode === "native"}
        ariaLabel={t("layout.native")}
        onClick={() => setLayoutMode("native")}
        icon={<Monitor />}
      />
      <ToolbarSegment
        active={layoutMode === "pip"}
        ariaLabel={t("layout.pip")}
        onClick={() => setLayoutMode("pip")}
        icon={<PictureInPicture2 />}
      />
      <ToolbarSegment
        active={layoutMode === "split"}
        ariaLabel={t("layout.split")}
        onClick={() => setLayoutMode("split")}
        icon={<PanelRight />}
      />
    </ToolbarGroup>
  );
}
