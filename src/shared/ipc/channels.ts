export const IPC_CHANNELS = {
  runtimeVersions: "runtime:versions",
  workspaceOpen: "workspace:open",
  browserCapturePage: "browser:capture-page",
  agentStartRun: "agent:start-run",
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];
