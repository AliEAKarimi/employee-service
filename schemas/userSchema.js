const { Schema } = require("redis-om");

const userSchema = new Schema(
  "user",
  {
    username: { type: "string" },
    jobSkill: { type: "string", indexed: false },
    job: { type: "string", indexed: false },
  },
  {
    dataStructure: "JSON",
  }
);

module.exports = userSchema;
