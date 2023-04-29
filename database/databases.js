const { getRedisClient } = require("../helpers/redisClientHelper");
const dotenv = require("dotenv");
dotenv.config();

const { REDIS_HOST, REDIS_PORT } = process.env;
const [userDB, parentDB] = [0, 0].map((database) => {
  const redisDB = getRedisClient(database, REDIS_HOST, REDIS_PORT);
  return redisDB;
});

async function connectToDatabases() {
  await userDB.connect();
  await parentDB.connect();
}

module.exports = {
  userDB,
  parentDB,
  connectToDatabases,
};
