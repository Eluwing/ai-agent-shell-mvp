const { ipcMain } = require("electron");

function registerLayoutHandlers(context) {
  ipcMain.handle("layout:enter-pip", () => context.pipWindowManager.enterPip());
  ipcMain.handle("layout:exit-pip", () => context.pipWindowManager.exitPip());
}

module.exports = {
  registerLayoutHandlers,
};
