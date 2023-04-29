const parentSchema = require("../schemas/parentSchema");
const { parentDB } = require("../database/databases");
const RedisRepository = require("./redisRepository");

const parentRepository = new RedisRepository(parentSchema, parentDB);

module.exports = parentRepository;
