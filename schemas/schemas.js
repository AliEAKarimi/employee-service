const Joi = require("joi");

const userSchema = Joi.object({
  idNumber: Joi.string().required(),
  data: Joi.object({
    username: Joi.string().required(),
    jobSkill: Joi.string().required(),
    job: Joi.object({
      company: Joi.string().required(),
    }).required(),
  }).required(),
  parent: Joi.string().required(),
});

const getUserQuerySchema = Joi.object({
  idNumber: Joi.string().required(),
});

module.exports = {
  userSchema,
  getUserQuerySchema,
};
