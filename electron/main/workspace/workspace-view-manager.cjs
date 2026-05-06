const { WebContentsView } = require("electron");
const {
  createWorkspaceSessionManager,
} = require("./workspace-session-manager.cjs");

function createWorkspaceViewManager({ mainWindow, logger }) {
  if (!mainWindow) {
    throw new Error("mainWindow is required to create workspace views");
  }

  const sessionManager = createWorkspaceSessionManager();
  const views = new Map();
  const boundsByWorkspaceId = new Map();
  let activeWorkspaceId = null;

  function normalizeUrl(url) {
    return url === "about:blank" ? "https://www.google.com" : url;
  }

  function createView(workspaceId) {
    return new WebContentsView({
      webPreferences: {
        partition: sessionManager.partitionForWorkspace(workspaceId),
      },
    });
  }

  function ensureView(workspaceId) {
    let view = views.get(workspaceId);

    if (!view) {
      view = createView(workspaceId);
      views.set(workspaceId, view);
    }

    return view;
  }

  function attachView(workspaceId) {
    const view = ensureView(workspaceId);

    if (activeWorkspaceId && activeWorkspaceId !== workspaceId) {
      const previousView = views.get(activeWorkspaceId);

      if (previousView) {
        mainWindow.contentView.removeChildView(previousView);
      }
    }

    if (activeWorkspaceId !== workspaceId) {
      mainWindow.contentView.addChildView(view);
      activeWorkspaceId = workspaceId;
    }

    const bounds = boundsByWorkspaceId.get(workspaceId);

    if (bounds) {
      view.setBounds(bounds);
    }

    return view;
  }

  return {
    async openWorkspace(input) {
      logger.info("open workspace", input.workspaceId);

      const view = attachView(input.workspaceId);
      view.webContents.loadURL(normalizeUrl(input.url));

      return {
        workspaceId: input.workspaceId,
        opened: true,
        sessionPartition: sessionManager.partitionForWorkspace(input.workspaceId),
      };
    },
    setWorkspaceViewBounds(input) {
      boundsByWorkspaceId.set(input.workspaceId, input.bounds);

      const view = views.get(input.workspaceId);

      if (view && activeWorkspaceId === input.workspaceId) {
        view.setBounds(input.bounds);
      }

      return {
        workspaceId: input.workspaceId,
        updated: true,
      };
    },
  };
}

module.exports = {
  createWorkspaceViewManager,
};
