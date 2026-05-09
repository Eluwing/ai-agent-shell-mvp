import type { CSSProperties } from "react";
import { AppTitleBarActions } from "@/app/components/title-bar/app-title-bar-actions";
import { AppTitleBarTabs } from "@/app/components/title-bar/app-title-bar-tabs";

const noDragStyle = { WebkitAppRegion: "no-drag" } as CSSProperties;

export function WorkspaceTitleBar() {
  return (
    <div className="flex h-9 min-w-0 justify-between not-only:items-center gap-1 overflow-hidden border-b border-shell-border bg-shell-bg px-3 pr-2 text-shell-fg backdrop-blur">
      <div className="flex min-w-0 items-end gap-1 overflow-hidden" style={noDragStyle}>
        <AppTitleBarTabs />
      </div>

      <div
        className="flex shrink-0 items-center gap-2 translate-y-px justify-self-end"
        style={noDragStyle}
      >
        <AppTitleBarActions />
      </div>
    </div>
  );
}
