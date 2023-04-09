const { getCurrentMethodName } = require("../helpers/helpers");

module.exports = class Database {
  save(key, value) {
    throw new Error(`Method ${getCurrentMethodName()} is not implemented.`);
  }
  update(key, value) {
    throw new Error(`Method ${getCurrentMethodName()} is not implemented.`);
  }
  get(key) {
    throw new Error(`Method ${getCurrentMethodName()} is not implemented.`);
  }
  delete(key) {
    throw new Error(`Method ${getCurrentMethodName()} is not implemented.`);
  }
}
