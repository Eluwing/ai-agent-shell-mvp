const { logger } = require("../logger/logger.cjs");
const {
  createWorkspaceViewManager,
} = require("../workspace/workspace-view-manager.cjs");

function createIpcHandlerContext({ mainWindow }) {
  return {
    mainWindow,
    logger,
    workspaceViewManager: createWorkspaceViewManager({ mainWindow, logger }),
  };
}

module.exports = {
  createIpcHandlerContext,
};
