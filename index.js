const http = require('http');
const url = require('url');
const redis = require('redis');
const client = redis.createClient();

client.connect();
client.on("connect", function () {
    console.log("اتصال موفق به پایگاه داده");
});
client.on("error", function (err) {
    console.log(`خطا در ارتباط با پایگاه داده ${err}`);
});

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
    
              const isIdExists = await client.exists(`id:${id}:data`);
              if (isIdExists) throw new Error("شناسه داده ها تکراری است.");
    
              const isParentExist = await client.exists(`id:${parent}:data`);
              if (!isParentExist) throw new Error("شناسه والد نامعتبر است.");
    
              // Save data and parent to Redis
              await client.set(`id:${id}:data`, data);
              await client.set(`id:${id}:parent`, parent);
    
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
const hostName = "127.0.0.1";
server.listen(serverPort, hostName, () => {
  console.log(`Server running at http://${hostName}:${serverPort}/`);
});
