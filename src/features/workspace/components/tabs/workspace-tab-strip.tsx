import { useMemo } from "react";
import { useTitleBarLayout } from "@/app/context/title-bar/title-bar-layout-context";
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
  const closeWorkspace = useWorkspaceStore((state) => state.closeWorkspace);

  const tabWidth = useMemo(() => {
    if (workspaces.length === 0) {
      return 88;
    }

    const padding = 8;
    const gap = 4;
    const trailingCushion = 10;
    const interTabGap = Math.max(0, (workspaces.length - 1) * gap);
    const availableForTabs =
      tabAreaWidth - padding - trailingCushion - interTabGap;
    const width = availableForTabs / workspaces.length;

    return Math.max(48, Math.min(132, width || 0));
  }, [tabAreaWidth, workspaces.length]);

  return (
    <div className="flex min-w-0 items-end gap-1 overflow-hidden rounded-t-2xl bg-zinc-900 px-1 pr-2 pt-1">
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
    </div>
  );
}
