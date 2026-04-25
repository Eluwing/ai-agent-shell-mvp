const path = require("node:path");
const { BrowserWindow } = require("electron");
const { isDev } = require("../config/env.cjs");
const { createMainWindowOptions } = require("./window-options.cjs");

function createMainWindow() {
  const win = new BrowserWindow(createMainWindowOptions());

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(__dirname, "../../../dist/index.html"));
  }

  return win;
}

module.exports = {
  createMainWindow,
};
