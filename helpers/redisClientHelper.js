const redis = require("redis");

function getRedisClient(database, host, port) {
  const client = redis.createClient({
    socket: {
      host,
      port,
    },
    database,
  });
  client.on("connect", () => {
    console.log(`successfully connected to database ${database}`);
  });
  client.on("error", (err) => {
    console.log(`error in connecting to database ${database}: ${err}`);
  });
  return client;
}

module.exports = { getRedisClient };
