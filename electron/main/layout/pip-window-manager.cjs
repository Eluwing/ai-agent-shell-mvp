const path = require("node:path");
const { BrowserWindow, screen } = require("electron");
const { isDev } = require("../config/env.cjs");

const PIP_WINDOW_WIDTH = 860;
const PIP_WINDOW_HEIGHT = 420;
const PIP_TITLEBAR_HEIGHT = 36;
const PIP_ACTIVITY_PANEL_WIDTH = 200;

function createPipWindowManager({ mainWindow, workspaceViewManager, logger }) {
  let pipWindow = null;

  function notifyMainWindowLayoutMode(layoutMode) {
    if (mainWindow.isDestroyed()) {
      return;
    }

    mainWindow.webContents.send("layout:mode-changed", { layoutMode });
  }

  function createPipWindow() {
    const display = screen.getDisplayNearestPoint(
      mainWindow.getBounds ? mainWindow.getBounds() : { x: 0, y: 0 },
    );
    const workArea = display.workArea;

    const win = new BrowserWindow({
      width: PIP_WINDOW_WIDTH,
      height: PIP_WINDOW_HEIGHT,
      minWidth: 640,
      minHeight: 320,
      x: Math.round(workArea.x + workArea.width - PIP_WINDOW_WIDTH - 24),
      y: Math.round(workArea.y + 24),
      title: "AI Agent Mock PIP",
      backgroundColor: "#202124",
      alwaysOnTop: true,
      skipTaskbar: true,
      titleBarStyle: process.platform === "darwin" ? "hiddenInset" : undefined,
      webPreferences: {
        preload: path.join(__dirname, "../../preload/index.cjs"),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    });

    win.setAlwaysOnTop(true, "floating");
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setFullScreenable(false);

    if (isDev) {
      win.loadURL(`${process.env.VITE_DEV_SERVER_URL}?surface=pip`);
    } else {
      win.loadFile(path.join(__dirname, "../../../dist/index.html"), {
        query: { surface: "pip" },
      });
    }

    win.on("closed", () => {
      workspaceViewManager.returnActiveWorkspaceViewToMainWindow();
      if (!mainWindow.isDestroyed()) {
        mainWindow.show();
        mainWindow.focus();
      }
      notifyMainWindowLayoutMode("native");
      pipWindow = null;
    });

    return win;
  }

  function getPipBrowserBounds() {
    const bounds = pipWindow.getContentBounds();
    const browserWidth = Math.max(320, bounds.width - PIP_ACTIVITY_PANEL_WIDTH);

    return {
      x: 0,
      y: PIP_TITLEBAR_HEIGHT,
      width: browserWidth,
      height: Math.max(0, bounds.height - PIP_TITLEBAR_HEIGHT),
    };
  }

  function syncPipBrowserBounds() {
    if (!pipWindow) {
      return;
    }

    workspaceViewManager.moveActiveWorkspaceViewToWindow(
      pipWindow,
      getPipBrowserBounds(),
    );
  }

  return {
    enterPip() {
      if (!pipWindow) {
        pipWindow = createPipWindow();
        pipWindow.on("resize", syncPipBrowserBounds);
      }

      syncPipBrowserBounds();
      pipWindow.show();
      pipWindow.moveTop();
      mainWindow.hide();
      logger.info("entered pip window");

      return { enabled: true };
    },
    exitPip() {
      const result = workspaceViewManager.returnActiveWorkspaceViewToMainWindow();

      if (pipWindow) {
        pipWindow.close();
      }

      if (!mainWindow.isDestroyed()) {
        mainWindow.show();
        mainWindow.focus();
      }
      notifyMainWindowLayoutMode("native");

      logger.info("exited pip window");

      return {
        enabled: false,
        workspaceId: result.workspaceId,
      };
    },
  };
}

module.exports = {
  createPipWindowManager,
};
