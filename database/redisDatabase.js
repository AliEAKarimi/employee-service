const Database = require("./database");
const { getRedisClient } = require("../helpers/redisClientHelper");
const DatabaseError = require("../errorHandlers/databaseError");

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
    try {
      await this.#client.connect();
    } catch (error) {
      throw new DatabaseError(`Error database connection, ${error}`);
    }
  }
  async save(key, value) {
    try {
      await this.#client.set(key, value);
    } catch (error) {
      throw new DatabaseError(`Error saving data, ${error}`);
    }
  }
  async update(key, value) {
    try {
      await this.#client.set(key, value);
    } catch (error) {
      throw new DatabaseError(`Error updating data, ${error}`);
    }
  }
  async get(key) {
    try {
      return await this.#client.get(key);
    } catch (error) {
      new DatabaseError(`Error getting data, ${error}`);
    }
  }
  async delete(key) {
    try {
      await this.#client.del(key);
    } catch (error) {
      new DatabaseError(`Error deleting data, ${error}`);
    }
  }
  async exists(key) {
    try {
      return await this.#client.exists(key);
    } catch (error) {
      new DatabaseError(`Error checking existence, ${error}`);
    }
  }
};
