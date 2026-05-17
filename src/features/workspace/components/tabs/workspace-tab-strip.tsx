import { useMemo } from "react";
import { useTitleBarLayout } from "@/features/layout/components/title-bar/title-bar-layout-context";
import {
  WORKSPACE_TAB_ADD_BUTTON_SPACE,
  WORKSPACE_TAB_EMPTY_WIDTH,
  WORKSPACE_TAB_GAP,
  WORKSPACE_TAB_INNER_PADDING,
  WORKSPACE_TAB_MIN_WIDTH,
  WORKSPACE_TAB_TRAILING_CUSHION,
} from "@/features/workspace/constants/workspace-tab-dimensions";
import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";
import { Button } from "@/shared/components/ui/button";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { Plus } from "lucide-react";
import { WorkspaceTab } from "./workspace-tab";

type WorkspaceTabStripProps = {
  onAddWorkspace: () => void;
};

export function WorkspaceTabStrip({ onAddWorkspace }: WorkspaceTabStripProps) {
  const { t } = useTranslation();
  const { tabAreaWidth } = useTitleBarLayout();
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );
  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace,
  );
  const closeWorkspace = useWorkspaceStore((state) => state.closeWorkspace);

  const tabWidth = useMemo(() => {
    if (workspaces.length === 0) {
      return WORKSPACE_TAB_EMPTY_WIDTH;
    }

    const interTabGap = Math.max(
      0,
      (workspaces.length - 1) * WORKSPACE_TAB_GAP,
    );
    const availableForTabs =
      tabAreaWidth -
      WORKSPACE_TAB_INNER_PADDING -
      WORKSPACE_TAB_TRAILING_CUSHION -
      WORKSPACE_TAB_ADD_BUTTON_SPACE -
      interTabGap;
    const width = Math.floor(availableForTabs / workspaces.length);

    return Math.max(WORKSPACE_TAB_MIN_WIDTH, width || 0);
  }, [tabAreaWidth, workspaces.length]);

  return (
    <div className="flex min-w-0 flex-1 items-end gap-1 overflow-hidden rounded-t-2xl bg-tab-strip px-1 pr-2 pt-1">
      <div className="flex min-w-0 flex-1 items-end gap-1 overflow-hidden">
        {workspaces.map((workspace) => (
          <WorkspaceTab
            key={workspace.id}
            workspace={workspace}
            active={activeWorkspaceId === workspace.id}
            tabWidth={tabWidth}
            onSelect={() => setActiveWorkspace(workspace.id)}
            onClose={() => closeWorkspace(workspace.id)}
          />
        ))}
      </div>

      <Button
        type="button"
        aria-label={t("workspace.addTab")}
        className="mb-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-shell-fg/70 transition-colors hover:bg-button-outline-hover hover:text-shell-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-primary/30 focus-visible:ring-offset-0"
        onClick={onAddWorkspace}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
