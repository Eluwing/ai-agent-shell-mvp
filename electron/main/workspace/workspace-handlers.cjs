const { ipcMain } = require("electron");

function registerWorkspaceHandlers(context) {
  ipcMain.handle("workspace:open", (_event, input) =>
    context.workspaceViewManager.openWorkspace(input),
  );
  ipcMain.handle("workspace:set-view-bounds", (_event, input) =>
    context.workspaceViewManager.setWorkspaceViewBounds(input),
  );
}

module.exports = {
  registerWorkspaceHandlers,
};
