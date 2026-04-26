import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useLayoutStore } from "@/features/layout/stores/layout-store";
import { TitleBarControlGroup } from "@/app/components/title-bar-control-group";
import { ViewToggleButton } from "./view-toggle-button";

export function ViewControls() {
  const workspaceSidebarVisible = useLayoutStore(
    (state) => state.workspaceSidebarVisible,
  );
  const toggleWorkspaceSidebar = useLayoutStore(
    (state) => state.toggleWorkspaceSidebar,
  );
  const inspectorVisible = useLayoutStore((state) => state.inspectorVisible);
  const toggleInspector = useLayoutStore((state) => state.toggleInspector);
  const { t } = useTranslation();

  return (
    <TitleBarControlGroup className="gap-0.5">
      <ViewToggleButton
        active={workspaceSidebarVisible}
        ariaLabel={
          workspaceSidebarVisible
            ? t("layout.sidebar.hide")
            : t("layout.sidebar.show")
        }
        onClick={toggleWorkspaceSidebar}
        activeIcon={<PanelLeftClose className="size-3" />}
        inactiveIcon={<PanelLeftOpen className="size-3" />}
      />
      <ViewToggleButton
        active={inspectorVisible}
        ariaLabel={
          inspectorVisible
            ? t("layout.inspector.hide")
            : t("layout.inspector.show")
        }
        onClick={toggleInspector}
        activeIcon={<PanelRightClose className="size-3" />}
        inactiveIcon={<PanelRightOpen className="size-3" />}
      />
    </TitleBarControlGroup>
  );
}
