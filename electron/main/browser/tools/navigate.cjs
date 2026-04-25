async function navigate(input) {
  return {
    ...input,
    navigated: true,
  };
}

module.exports = {
  navigate,
};
