function isNavigationAllowed(url) {
  return url.startsWith("https://") || url.startsWith("http://localhost");
}

module.exports = {
  isNavigationAllowed,
};
