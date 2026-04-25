const { getDbPath } = require("./db-path.cjs");

function createDb() {
  return {
    path: getDbPath(),
  };
}

module.exports = {
  createDb,
};
