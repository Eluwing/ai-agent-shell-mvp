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
    workspace: {
      open: (input) => ipcRenderer.invoke("workspace:open", input),
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

function exposeElectronApi() {
  contextBridge.exposeInMainWorld("agentShell", createElectronApi());
}

module.exports = {
  exposeElectronApi,
};
