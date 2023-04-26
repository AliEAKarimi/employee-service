const { Schema } = require("redis-om");

const parentSchema = new Schema(
  "parent",
  {
    parent: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

module.exports = parentSchema;
