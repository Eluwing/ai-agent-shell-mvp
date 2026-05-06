const { ipcMain } = require("electron");

function registerWorkspaceHandlers(context) {
  ipcMain.handle("workspace:open", (_event, input) =>
    context.workspaceViewManager.openWorkspace(input),
  );
  ipcMain.handle("workspace:set-view-bounds", (_event, input) =>
    context.workspaceViewManager.setWorkspaceViewBounds(input),
  );
  ipcMain.handle("workspace:navigate-back", (_event, input) =>
    context.workspaceViewManager.navigateWorkspaceBack(input),
  );
  ipcMain.handle("workspace:navigate-forward", (_event, input) =>
    context.workspaceViewManager.navigateWorkspaceForward(input),
  );
  ipcMain.handle("workspace:reload", (_event, input) =>
    context.workspaceViewManager.reloadWorkspace(input),
  );
  ipcMain.handle("workspace:navigation-state", (_event, input) =>
    context.workspaceViewManager.getWorkspaceNavigationState(input),
  );
}

module.exports = {
  registerWorkspaceHandlers,
};
