const { app } = require("electron");
const path = require("node:path");

function getDbPath() {
  return path.join(app.getPath("userData"), "ai-agent-mock.sqlite");
}

module.exports = {
  getDbPath,
};
