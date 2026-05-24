import type { CSSProperties } from "react";
import { AppTitleBarActions } from "@/features/layout/components/title-bar/app-title-bar-actions";
import { AppTitleBarBrand } from "@/features/layout/components/title-bar/app-title-bar-brand";
import { AppTitleBarTabs } from "@/features/layout/components/title-bar/app-title-bar-tabs";
import { WORKSPACE_TAB_MAX_WIDTH_APP } from "@/features/workspace/constants/workspace-tab-dimensions";

const dragStyle = { WebkitAppRegion: "drag" } as CSSProperties;
const noDragStyle = { WebkitAppRegion: "no-drag" } as CSSProperties;

export function AppTitleBar() {
  return (
    <header className="grid h-app-titlebar grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-shell-border bg-shell-bg pl-titlebar-leading pr-titlebar-horizontal text-shell-fg backdrop-blur">
      <div className="flex h-full shrink-0 items-center" style={dragStyle}>
        <AppTitleBarBrand />
      </div>

      <div className="min-w-0 self-end overflow-hidden" style={noDragStyle}>
        <AppTitleBarTabs maxTabWidth={WORKSPACE_TAB_MAX_WIDTH_APP} />
      </div>

      <div style={noDragStyle}>
        <AppTitleBarActions />
      </div>
    </header>
  );
}
