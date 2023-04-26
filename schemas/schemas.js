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

const userUpdateSchema = Joi.object({
  id: Joi.string().required(),
  data: Joi.object({
    jobSkill: Joi.string(),
    job: Joi.object({
      company: Joi.string(),
      post: Joi.string(),
      start: Joi.date(),
      phones: Joi.array(),
    }),
  }).required(),
  parent: Joi.string(),
  newUsername: Joi.string(),
});

const getUserQuerySchema = Joi.object({
  id: Joi.string().required(),
});

const getUserOfAParentQuerySchema = Joi.object({
  parent: Joi.string().required(),
});

const idSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  userSchema,
  getUserQuerySchema,
  idSchema,
  userUpdateSchema,
  getUserOfAParentQuerySchema,
};
