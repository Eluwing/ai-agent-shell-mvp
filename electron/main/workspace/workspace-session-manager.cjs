function createWorkspaceSessionManager() {
  return {
    partitionForWorkspace: (workspaceId) => `persist:workspace-${workspaceId}`,
  };
}

module.exports = {
  createWorkspaceSessionManager,
};
