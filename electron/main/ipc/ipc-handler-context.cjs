const { logger } = require("../logger/logger.cjs");
const {
  createWorkspaceViewManager,
} = require("../workspace/workspace-view-manager.cjs");
const {
  createPipWindowManager,
} = require("../layout/pip-window-manager.cjs");

function createIpcHandlerContext({ mainWindow }) {
  const workspaceViewManager = createWorkspaceViewManager({ mainWindow, logger });

  return {
    mainWindow,
    logger,
    workspaceViewManager,
    pipWindowManager: createPipWindowManager({
      mainWindow,
      workspaceViewManager,
      logger,
    }),
  };
}

module.exports = {
  createIpcHandlerContext,
};
