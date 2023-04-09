const Database = require("./database");
const { getRedisClient } = require("../helpers/redisClientHelper");

const instance = {};
module.exports = class RedisDatabase extends Database {
  #client;
  constructor(database, host, port) {
    if (!instance[`${database}-${host}-${port}`]) {
      super();
      this.host = host;
      this.port = port;
      this.database = database;
      this.#client = getRedisClient(database, host, port);
      instance[`${database}-${host}-${port}`] = this;
    } else {
      return instance[`${database}-${host}-${port}`];
    }
  }
  async connect() {
    await this.#client.connect();
  }
  async save(key, value) {
    await this.#client.set(key, value);
  }
  async update(key, value) {
    await this.#client.set(key, value);
  }
  async get(key) {
    return await this.#client.get(key);
  }
  async delete(key) {
    await this.#client.del(key);
  }
  async exists(key) {
    return await this.#client.exists(key);
  }
};
