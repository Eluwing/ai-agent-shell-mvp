import { Monitor, PanelRight, PictureInPicture2 } from "lucide-react";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { TitleBarControlGroup } from "@/features/layout/components/title-bar/title-bar-control-group";
import { ToolbarSegment } from "./toolbar-segment";

export function LayoutModeToolbar() {
  const setLayoutMode = useLayoutStore((state) => state.setLayoutMode);
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const { t } = useTranslation();

  return (
    <TitleBarControlGroup className="gap-0.5">
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
    </TitleBarControlGroup>
  );
}
