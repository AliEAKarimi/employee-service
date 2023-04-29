const { Schema } = require("redis-om");

const userSchema = new Schema(
  "user",
  {
    username: { type: "string" },
    jobSkill: { type: "string" },
    job: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

module.exports = userSchema;
