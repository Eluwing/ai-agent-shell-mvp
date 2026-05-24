import { useMemo } from "react";
import { useTitleBarLayout } from "@/features/layout/components/title-bar/title-bar-layout-context";
import {
  WORKSPACE_TAB_EMPTY_WIDTH,
  WORKSPACE_TAB_GAP,
  WORKSPACE_TAB_MIN_WIDTH,
} from "@/features/workspace/constants/workspace-tab-dimensions";
import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";
import { Button } from "@/shared/components/ui/button";
import { useElementWidth } from "@/shared/hooks/use-element-width";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { Plus } from "lucide-react";
import { WorkspaceTab } from "./workspace-tab";

type WorkspaceTabStripProps = {
  onAddWorkspace: () => void;
};

export function WorkspaceTabStrip({ onAddWorkspace }: WorkspaceTabStripProps) {
  const { t } = useTranslation();
  const { tabAreaWidth, maxTabWidth } = useTitleBarLayout();
  const [tabsListRef, tabsListWidth] = useElementWidth<HTMLDivElement>();
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
    const availableForTabs = tabsListWidth || tabAreaWidth;
    const width = Math.floor(
      (availableForTabs - interTabGap) / workspaces.length,
    );

    return Math.max(
      WORKSPACE_TAB_MIN_WIDTH,
      Math.min(maxTabWidth, width || 0),
    );
  }, [maxTabWidth, tabAreaWidth, tabsListWidth, workspaces.length]);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden rounded-t-2xl bg-tab-strip px-4">
      <div
        ref={tabsListRef}
        className="flex min-w-0 flex-1 gap-1 overflow-hidden"
      >
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
        className="h-6 w-6 shrink-0 rounded-full border border-transparent bg-transparent px-0 text-shell-fg/70 transition-colors hover:text-button-primary-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-primary/30 focus-visible:ring-offset-0"
        onClick={onAddWorkspace}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
