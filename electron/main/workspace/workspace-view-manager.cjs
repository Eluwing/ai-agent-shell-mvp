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
  const navigationStateByWorkspaceId = new Map();
  let activeWorkspaceId = null;

  function normalizeUrl(url) {
    return url === "about:blank" ? "https://www.google.com" : url;
  }

  function readNavigationState(view) {
    return {
      currentUrl: normalizeUrl(view.webContents.getURL() || "about:blank"),
      canGoBack: view.webContents.canGoBack(),
      canGoForward: view.webContents.canGoForward(),
    };
  }

  function emitNavigationState(workspaceId, view) {
    const state = readNavigationState(view);

    navigationStateByWorkspaceId.set(workspaceId, state);
    mainWindow.webContents.send("workspace:navigation-state-changed", {
      workspaceId,
      ...state,
    });
  }

  function createView(workspaceId) {
    const view = new WebContentsView({
      webPreferences: {
        partition: sessionManager.partitionForWorkspace(workspaceId),
      },
    });

    const syncNavigationState = () => {
      emitNavigationState(workspaceId, view);
    };

    view.webContents.on("did-navigate", syncNavigationState);
    view.webContents.on("did-navigate-in-page", syncNavigationState);
    view.webContents.on("did-finish-load", syncNavigationState);
    view.webContents.on("page-title-updated", syncNavigationState);

    return view;
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

  function refreshNavigationState(workspaceId) {
    const view = views.get(workspaceId);

    if (!view) {
      return;
    }

    emitNavigationState(workspaceId, view);
  }

  return {
    async openWorkspace(input) {
      logger.info("open workspace", input.workspaceId);

      const view = attachView(input.workspaceId);
      view.webContents.loadURL(normalizeUrl(input.url));
      emitNavigationState(input.workspaceId, view);

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
    navigateWorkspaceBack(input) {
      const view = views.get(input.workspaceId);

      if (view?.webContents?.canGoBack()) {
        view.webContents.goBack();
      }

      refreshNavigationState(input.workspaceId);

      return {
        workspaceId: input.workspaceId,
        navigated: true,
      };
    },
    navigateWorkspaceForward(input) {
      const view = views.get(input.workspaceId);

      if (view?.webContents?.canGoForward()) {
        view.webContents.goForward();
      }

      refreshNavigationState(input.workspaceId);

      return {
        workspaceId: input.workspaceId,
        navigated: true,
      };
    },
    reloadWorkspace(input) {
      const view = views.get(input.workspaceId);

      if (view?.webContents) {
        view.webContents.reload();
      }

      refreshNavigationState(input.workspaceId);

      return {
        workspaceId: input.workspaceId,
        reloaded: true,
      };
    },
    getWorkspaceNavigationState(input) {
      const view = views.get(input.workspaceId);
      const state =
        navigationStateByWorkspaceId.get(input.workspaceId) ??
        (view
          ? readNavigationState(view)
          : {
              currentUrl: "about:blank",
              canGoBack: false,
              canGoForward: false,
            });

      return {
        workspaceId: input.workspaceId,
        ...state,
      };
    },
  };
}

module.exports = {
  createWorkspaceViewManager,
};
