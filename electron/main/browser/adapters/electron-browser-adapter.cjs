const { capturePage } = require("../tools/capture-page.cjs");

function createElectronBrowserAdapter() {
  return {
    capturePage,
  };
}

module.exports = {
  createElectronBrowserAdapter,
};
