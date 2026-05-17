const { contextBridge, ipcRenderer } = require("electron");

function createElectronApi() {
  const runtime = {
    versions: () => ipcRenderer.invoke("runtime:versions"),
  };

  return {
    runtime,
    window: {
      minimize: () => ipcRenderer.invoke("window:minimize"),
      toggleMaximize: () => ipcRenderer.invoke("window:toggle-maximize"),
      close: () => ipcRenderer.invoke("window:close"),
    },
    layout: {
      enterPip: () => ipcRenderer.invoke("layout:enter-pip"),
      exitPip: () => ipcRenderer.invoke("layout:exit-pip"),
      onModeChanged: (callback) => {
        const listener = (_event, input) => callback(input);
        ipcRenderer.on("layout:mode-changed", listener);

        return () => {
          ipcRenderer.removeListener("layout:mode-changed", listener);
        };
      },
    },
    workspace: {
      open: (input) => ipcRenderer.invoke("workspace:open", input),
      setViewBounds: (input) =>
        ipcRenderer.invoke("workspace:set-view-bounds", input),
      navigateBack: (input) =>
        ipcRenderer.invoke("workspace:navigate-back", input),
      navigateForward: (input) =>
        ipcRenderer.invoke("workspace:navigate-forward", input),
      reload: (input) => ipcRenderer.invoke("workspace:reload", input),
      getNavigationState: (input) =>
        ipcRenderer.invoke("workspace:navigation-state", input),
      onNavigationStateChanged: (callback) => {
        const listener = (_event, input) => callback(input);
        ipcRenderer.on("workspace:navigation-state-changed", listener);

        return () => {
          ipcRenderer.removeListener(
            "workspace:navigation-state-changed",
            listener,
          );
        };
      },
    },
    browser: {
      capturePage: (input) => ipcRenderer.invoke("browser:capture-page", input),
    },
    agent: {
      startRun: (input) => ipcRenderer.invoke("agent:start-run", input),
    },
    versions: runtime.versions,
  };
}

contextBridge.exposeInMainWorld("agentShell", createElectronApi());
