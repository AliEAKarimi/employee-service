const http = require("http");
const url = require("url");
const redis = require("redis");

const createRedisClient = function (database, host, port) {
  const client = redis.createClient({
    socket: {
      host,
      port,
    },
    database,
  });
  client.on("connect", function () {
    console.log(`اتصال موفق به پایگاه داده ${database}`);
  });
  client.on("error", function (err) {
    console.log(`خطا در ارتباط با پایگاه داده ${database}: ${err}`);
  });
  return client;
};

const hostName = "127.0.0.1";
const redisPort = 6379;
const [dataClient, parentClient] = [0, 1].map((database) =>
  createRedisClient(database, hostName, redisPort)
);
dataClient.connect();
parentClient.connect();

const server = http.createServer(async (req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const method = req.method;
  if (pathname === "/dataService") {
    if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const { id, data, parent } = JSON.parse(body);
        try {
          // if (!id || !data || !parent) throw new Error("درخواست نامعتبر است.");

          const isIdExists = await dataClient.exists(id);
          if (isIdExists) throw new Error("شناسه داده ها تکراری است.");

          const isParentExist = await dataClient.exists(parent);
          if (!isParentExist) throw new Error("شناسه والد نامعتبر است.");

          // Save data and parent to Redis
          await dataClient.set(id, data);
          await parentClient.set(id, parent);

          res.end("داده ها ذخیره شد.");
        } catch (error) {
          res.statusCode = error.statusCode ?? 500;
          res.end(error.message ?? "خطا در ارتباط با پایگاه داده");
        }
      });
    }
  }
});

const serverPort = 81;
server.listen(serverPort, hostName, () => {
  console.log(`Server running at http://${hostName}:${serverPort}/`);
});
