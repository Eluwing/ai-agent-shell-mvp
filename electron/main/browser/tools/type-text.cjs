async function typeText(input) {
  return {
    ...input,
    typed: true,
  };
}

module.exports = {
  typeText,
};
