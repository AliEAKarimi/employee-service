const redis = require("redis");
const Database = require("./database");
module.exports = class RedisDatabase extends Database {
  #database;
  #host;
  #port;
  #client;
  constructor(database, host, port) {
    super();
    this.#database = database;
    this.#host = host;
    this.#port = port;
    this.#createRedisClient();
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

  #createRedisClient() {
    this.#client = redis.createClient({
      socket: {
        host: this.#host,
        port: this.#port,
      },
      database: this.#database,
    });
    this.#client.on("connect", () => {
      console.log(`successfully connected to database ${this.#database}`);
    });
    this.#client.on("error", (err) => {
      console.log(`error in connecting to database ${this.#database}: ${err}`);
    });
    this.connect();
  }
};
