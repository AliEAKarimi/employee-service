const userSchema = require("../schemas/userSchema");
const { userDB } = require("../database/databases");
const RedisRepository = require("./redisRepository");

const userRepository = new RedisRepository(userSchema, userDB);

module.exports = userRepository;
