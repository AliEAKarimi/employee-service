const url = require("url");
module.exports = async function queryParamsParser(request, response) {
  request.body = url.parse(request.url, true).query;
};
