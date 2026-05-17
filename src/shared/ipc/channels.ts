export const IPC_CHANNELS = {
  runtimeVersions: "runtime:versions",
  workspaceOpen: "workspace:open",
  workspaceSetViewBounds: "workspace:set-view-bounds",
  workspaceNavigateBack: "workspace:navigate-back",
  workspaceNavigateForward: "workspace:navigate-forward",
  workspaceReload: "workspace:reload",
  workspaceNavigationStateChanged: "workspace:navigation-state-changed",
  browserCapturePage: "browser:capture-page",
  agentStartRun: "agent:start-run",
  windowMinimize: "window:minimize",
  windowToggleMaximize: "window:toggle-maximize",
  windowClose: "window:close",
  layoutEnterPip: "layout:enter-pip",
  layoutExitPip: "layout:exit-pip",
  layoutModeChanged: "layout:mode-changed",
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];
