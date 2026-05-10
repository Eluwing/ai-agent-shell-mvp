const { registerRuntimeHandlers } = require("../runtime/runtime-handlers.cjs");
const { registerWorkspaceHandlers } = require("../workspace/workspace-handlers.cjs");
const { registerBrowserHandlers } = require("../browser/browser-handlers.cjs");
const { registerAgentHandlers } = require("../agent-runtime/runs/agent-handlers.cjs");
const { registerWindowHandlers } = require("../window/window-handlers.cjs");
const { registerLayoutHandlers } = require("../layout/layout-handlers.cjs");

function registerIpcHandlers(context) {
  registerRuntimeHandlers(context);
  registerWorkspaceHandlers(context);
  registerBrowserHandlers(context);
  registerAgentHandlers(context);
  registerWindowHandlers(context);
  registerLayoutHandlers(context);
}

module.exports = {
  registerIpcHandlers,
};
