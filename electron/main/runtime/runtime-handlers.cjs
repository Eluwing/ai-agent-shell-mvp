const { ipcMain } = require("electron");

function registerRuntimeHandlers() {
  ipcMain.handle("runtime:versions", () => ({
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  }));
}

module.exports = {
  registerRuntimeHandlers,
};
