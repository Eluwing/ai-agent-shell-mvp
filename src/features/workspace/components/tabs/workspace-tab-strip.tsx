import { useMemo } from "react";
import { Plus } from "lucide-react";
import { useTitleBarLayout } from "@/app/context/title-bar/title-bar-layout-context";
import { useTranslation } from "@/shared/i18n/hooks/use-translation";
import { useWorkspaceStore } from "@/features/workspace/stores/workspace-store";
import { WorkspaceTab } from "./workspace-tab";

export function WorkspaceTabStrip() {
  const { tabAreaWidth } = useTitleBarLayout();
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );
  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace,
  );
  const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);
  const closeWorkspace = useWorkspaceStore((state) => state.closeWorkspace);
  const { t } = useTranslation();

  const tabWidth = useMemo(() => {
    if (workspaces.length === 0) {
      return 88;
    }

    const padding = 8;
    const gap = 4;
    const availableForTabs = tabAreaWidth - padding - workspaces.length * gap;
    const computedWidth = Math.floor(availableForTabs / workspaces.length);

    return Math.max(64, Math.min(132, computedWidth || 0));
  }, [tabAreaWidth, workspaces.length]);

  return (
    <div className="flex min-w-0 items-end gap-1 overflow-hidden bg-zinc-900 rounded-t-2xl px-1 pt-1">
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
      <button
        type="button"
        aria-label={t("workspace.addTab")}
        className="mb-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        onClick={addWorkspace}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
