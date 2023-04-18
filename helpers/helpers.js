Object.deepExtend = function (destination, source) {
  for (var property in source) {
    if (typeof source[property] === "object" && source[property] !== null) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
};

function getCurrentMethodName() {
  return new Error().stack.split("at ")[2].split(" ")[0];
}

module.exports = {
  getCurrentMethodName,
};
