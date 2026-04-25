const { ipcMain } = require("electron");
const { capturePage } = require("./tools/capture-page.cjs");

function registerBrowserHandlers() {
  ipcMain.handle("browser:capture-page", (_event, input) =>
    capturePage(input),
  );
}

module.exports = {
  registerBrowserHandlers,
};
