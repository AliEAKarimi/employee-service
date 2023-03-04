async function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      try {
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
  });
}
function sendResponse(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(data));
}
module.exports = {
  parseRequestBody,
  sendResponse,
};
