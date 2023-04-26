const { Repository } = require("redis-om");
const userSchema = require("../schemas/userSchema");
const { userDB } = require("../database/databases");

const userRepository = new Repository(userSchema, userDB);

module.exports = userRepository;
