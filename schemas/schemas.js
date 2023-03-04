const Joi = require("joi");

const userSchema = Joi.object({
  id: Joi.string().required(),
  data: Joi.object().required(),
  parent: Joi.string().required(),
});

const getUserQuerySchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  userSchema,
  getUserQuerySchema,
};
