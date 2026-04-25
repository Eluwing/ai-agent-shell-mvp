const {
  createWorkspaceSessionManager,
} = require("./workspace-session-manager.cjs");

function createWorkspaceViewManager({ logger }) {
  const sessionManager = createWorkspaceSessionManager();

  return {
    async openWorkspace(input) {
      logger.info("open workspace", input.workspaceId);

      return {
        workspaceId: input.workspaceId,
        opened: true,
        sessionPartition: sessionManager.partitionForWorkspace(input.workspaceId),
      };
    },
  };
}

module.exports = {
  createWorkspaceViewManager,
};
