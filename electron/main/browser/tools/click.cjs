async function click(input) {
  return {
    ...input,
    clicked: true,
  };
}

module.exports = {
  click,
};
