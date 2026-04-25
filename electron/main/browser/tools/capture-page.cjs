async function capturePage({ workspaceId }) {
  return {
    workspaceId,
    imageDataUrl: "",
  };
}

module.exports = {
  capturePage,
};
