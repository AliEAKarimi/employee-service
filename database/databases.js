const { getRedisClient } = require("../helpers/redisClientHelper");
const dotenv = require("dotenv");
dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;
const [userDB, parentDB] = [0, 1].map((database) => {
  const redisDB = getRedisClient(database, REDIS_HOST, REDIS_PORT);
  return redisDB;
});
module.exports = {
  userDB,
  parentDB,
};
