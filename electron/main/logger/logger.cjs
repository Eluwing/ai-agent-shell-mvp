const logger = {
  info: (...args) => console.info("[main]", ...args),
  warn: (...args) => console.warn("[main]", ...args),
  error: (...args) => console.error("[main]", ...args),
};

module.exports = {
  logger,
};
