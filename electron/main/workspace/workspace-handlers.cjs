const { ipcMain } = require("electron");

function registerWorkspaceHandlers(context) {
  ipcMain.handle("workspace:open", (_event, input) =>
    context.workspaceViewManager.openWorkspace(input),
  );
}

module.exports = {
  registerWorkspaceHandlers,
};
