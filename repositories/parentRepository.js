const { Repository } = require("redis-om");
const parentSchema = require("../schemas/parentSchema");
const { parentDB } = require("../database/databases");

const parentRepository = new Repository(parentSchema, parentDB);

module.exports = parentRepository;
