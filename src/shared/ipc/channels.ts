export const IPC_CHANNELS = {
  runtimeVersions: "runtime:versions",
  workspaceOpen: "workspace:open",
  workspaceSetViewBounds: "workspace:set-view-bounds",
  browserCapturePage: "browser:capture-page",
  agentStartRun: "agent:start-run",
  windowMinimize: "window:minimize",
  windowToggleMaximize: "window:toggle-maximize",
  windowClose: "window:close",
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];
