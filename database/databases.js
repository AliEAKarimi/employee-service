const RedisDatabase = require("./redisDatabase");
const dotenv = require("dotenv");
dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;
const [userDB, parentDB] = [0, 1].map((database) => {
  const redisDB = new RedisDatabase(database, REDIS_HOST, REDIS_PORT);
  return redisDB;
});
module.exports = {
  userDB,
  parentDB,
};
