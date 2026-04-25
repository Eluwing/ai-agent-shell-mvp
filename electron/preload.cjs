const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("agentShell", {
  versions: () => ipcRenderer.invoke("app:versions"),
});
