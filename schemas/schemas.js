const Joi = require("joi");

const userSchema = Joi.object({
  id: Joi.string().required(),
  data: Joi.object({
    idNumber: Joi.string().required(),
    jobSkill: Joi.string().required(),
    job: Joi.object({
      company: Joi.string().required(),
      post: Joi.string().required(),
      start: Joi.date().required(),
      phones: Joi.array().required(),
    }).required(),
  }).required(),
  parent: Joi.string().required(),
});

const getUserQuerySchema = Joi.object({
  id: Joi.string().required(),
});

const idSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  userSchema,
  getUserQuerySchema,
  idSchema,
};
