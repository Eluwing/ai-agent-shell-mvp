function isPermissionAllowed(permission) {
  return ["clipboard-read"].includes(permission);
}

module.exports = {
  isPermissionAllowed,
};
