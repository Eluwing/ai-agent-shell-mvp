import { PanelRight } from "lucide-react";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { TitleBarControlGroup } from "@/features/layout/components/title-bar/title-bar-control-group";
import { NativeModeButton } from "./native-mode-button";
import { PipModeButton } from "./pip-mode-button";
import { ToolbarSegment } from "./toolbar-segment";

export function LayoutModeToolbar() {
  const setLayoutMode = useLayoutStore((state) => state.setLayoutMode);
  const layoutMode = useLayoutStore((state) => state.layoutMode);
  const { t } = useTranslation();

  return (
    <TitleBarControlGroup className="gap-0.5">
      <NativeModeButton
        active={layoutMode === "native"}
        onClick={() => setLayoutMode("native")}
      />
      <PipModeButton
        active={layoutMode === "pip"}
        onClick={() => setLayoutMode("pip")}
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
