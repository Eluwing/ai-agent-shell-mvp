export type ElectronBrowserToolAdapter = {
  capturePage: (workspaceId: string) => Promise<unknown>;
};

export const electronBrowserToolAdapter: ElectronBrowserToolAdapter = {
  capturePage: (workspaceId) =>
    window.agentShell?.browser.capturePage({ workspaceId }) ?? Promise.resolve(),
};
