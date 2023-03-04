function getCurrentMethodName() {
  return new Error().stack.split("at ")[2].split(" ")[0];
}

module.exports = {
  getCurrentMethodName,
};
