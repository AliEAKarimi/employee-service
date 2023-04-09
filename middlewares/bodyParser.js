const url = require("url");
module.exports = async function bodyParser(request, response, { isParams }) {
  if (isParams) {
    request.body = url.parse(request.url, true).query;
  } else {
    request.body = await new Promise((resolve, reject) => {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
  }
};
