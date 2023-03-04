const Database = require("./database");
const { getRedisClient } = require("../helpers/redisClientHelper");
module.exports = class RedisDatabase extends Database {
  #client;
  constructor(database, host, port) {
    super();
    this.#client = getRedisClient(database, host, port);
  }
  async connect() {
    await this.#client.connect();
  }
  async add(key, value) {
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
