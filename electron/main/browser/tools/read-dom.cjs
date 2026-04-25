async function readDom({ workspaceId }) {
  return {
    workspaceId,
    dom: "",
  };
}

module.exports = {
  readDom,
};
