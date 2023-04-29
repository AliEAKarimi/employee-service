const { Repository } = require("redis-om");
const RepositoryInterface = require("./repositoryInterface");

module.exports = class RedisRepository extends RepositoryInterface {
  constructor(schema, db) {
    super();
    this.redis = db;
    this.repository = new Repository(schema, db);
  }

  async save(id, data) {
    return this.repository.save(id, data);
  }
  async remove(id) {
    return this.repository.remove(id);
  }
  async fetch(id) {
    return this.repository.fetch(id);
  }
  async exists(id) {
    return this.redis.exists(id);
  }
  async createIndex() {
    return this.repository.createIndex();
  }
  async search() {
    return await this.repository.search();
  }
};
