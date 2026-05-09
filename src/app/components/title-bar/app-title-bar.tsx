import type { CSSProperties } from "react";
import { AppTitleBarActions } from "@/app/components/title-bar/app-title-bar-actions";
import { AppTitleBarBrand } from "@/app/components/title-bar/app-title-bar-brand";
import { AppTitleBarTabs } from "@/app/components/title-bar/app-title-bar-tabs";

const dragStyle = { WebkitAppRegion: "drag" } as CSSProperties;
const noDragStyle = { WebkitAppRegion: "no-drag" } as CSSProperties;

export function AppTitleBar() {
  return (
    <header className="grid h-app-titlebar grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-shell-border bg-shell-bg pl-titlebar-leading pr-titlebar-horizontal text-shell-fg backdrop-blur">
      <div className="flex h-full shrink-0 items-center" style={dragStyle}>
        <AppTitleBarBrand />
      </div>

      <div className="flex min-w-0 items-end gap-1 overflow-hidden" style={noDragStyle}>
        <AppTitleBarTabs />
      </div>

      <div
        className="flex shrink-0 items-center gap-2 translate-y-px justify-self-end"
        style={noDragStyle}
      >
        <AppTitleBarActions />
      </div>
    </header>
  );
}
