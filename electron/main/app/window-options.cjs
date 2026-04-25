const path = require("node:path");
const { appConfig } = require("../config/app-config.cjs");

function createMainWindowOptions() {
  return {
    width: appConfig.defaultWindowSize.width,
    height: appConfig.defaultWindowSize.height,
    minWidth: appConfig.defaultWindowSize.minWidth,
    minHeight: appConfig.defaultWindowSize.minHeight,
    title: "AI Agent Mock",
    backgroundColor: "#f7f7f5",
    webPreferences: {
      preload: path.join(__dirname, "../../preload/index.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  };
}

module.exports = {
  createMainWindowOptions,
};
