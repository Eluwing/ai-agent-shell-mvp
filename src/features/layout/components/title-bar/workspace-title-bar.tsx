import type { CSSProperties } from "react";
import { AppTitleBarActions } from "@/features/layout/components/title-bar/app-title-bar-actions";
import { AppTitleBarTabs } from "@/features/layout/components/title-bar/app-title-bar-tabs";
import { WORKSPACE_TAB_MAX_WIDTH_WORKSPACE } from "@/features/workspace/constants/workspace-tab-dimensions";

const noDragStyle = { WebkitAppRegion: "no-drag" } as CSSProperties;

export function WorkspaceTitleBar() {
  return (
    <div className="flex h-app-titlebar min-w-0 justify-between not-only:items-center gap-1 overflow-hidden border-b border-shell-border bg-shell-bg px-titlebar-horizontal text-shell-fg backdrop-blur">
      <div className="flex flex-1 min-w-0 items-end gap-1 overflow-hidden" style={noDragStyle}>
        <AppTitleBarTabs maxTabWidth={WORKSPACE_TAB_MAX_WIDTH_WORKSPACE} />
      </div>

      <div className="flex shrink-0 items-center gap-2 justify-self-end" style={noDragStyle}>
        <AppTitleBarActions />
      </div>
    </div>
  );
}
