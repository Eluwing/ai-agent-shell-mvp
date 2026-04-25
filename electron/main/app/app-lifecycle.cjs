const { app, BrowserWindow } = require("electron");
const { createMainWindow } = require("./create-main-window.cjs");
const { createIpcHandlerContext } = require("../ipc/ipc-handler-context.cjs");
const { registerIpcHandlers } = require("../ipc/register-ipc-handlers.cjs");

function registerAppLifecycle() {
  app.whenReady().then(() => {
    const mainWindow = createMainWindow();
    const context = createIpcHandlerContext({ mainWindow });
    registerIpcHandlers(context);

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
      }
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
}

module.exports = {
  registerAppLifecycle,
};
