const { Schema } = require("redis-om");

const userSchema = new Schema(
  "user",
  {
    jobSkill: { type: "string" },
    job: { type: "string" },
    idNumber: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

module.exports = userSchema;
