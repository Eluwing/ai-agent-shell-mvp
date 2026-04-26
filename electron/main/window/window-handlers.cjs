const { ipcMain } = require("electron");

function registerWindowHandlers(context) {
  ipcMain.handle("window:minimize", () => {
    context.mainWindow.minimize();
  });

  ipcMain.handle("window:toggle-maximize", () => {
    if (context.mainWindow.isMaximized()) {
      context.mainWindow.restore();
      return { maximized: false };
    }

    context.mainWindow.maximize();
    return { maximized: true };
  });

  ipcMain.handle("window:close", () => {
    context.mainWindow.close();
  });
}

module.exports = {
  registerWindowHandlers,
};
