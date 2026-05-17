import type { CSSProperties } from "react";
import { NativeModeButton } from "@/features/layout/components/toolbar/native-mode-button";
import { PipModeButton } from "@/features/layout/components/toolbar/pip-mode-button";

const dragStyle = { WebkitAppRegion: "drag" } as CSSProperties;
const noDragStyle = { WebkitAppRegion: "no-drag" } as CSSProperties;

export function PipTitleBar() {
  const handleExitPip = () => {
    void window.agentShell?.layout.exitPip();
  };

  return (
    <header className="grid h-app-titlebar grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-shell-border bg-shell-bg px-titlebar-horizontal text-shell-fg backdrop-blur">
      <div className="h-full min-w-28" style={dragStyle} />
      <div className="h-full w-full min-w-0" style={dragStyle} />

      <div style={noDragStyle}>
        <div className="flex items-center gap-0.5">
          <NativeModeButton onClick={handleExitPip} />
          <PipModeButton active />
        </div>
      </div>
    </header>
  );
}
