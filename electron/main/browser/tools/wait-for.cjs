async function waitFor(input) {
  return {
    ...input,
    waited: true,
  };
}

module.exports = {
  waitFor,
};
