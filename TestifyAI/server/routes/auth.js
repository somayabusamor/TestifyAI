const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");


const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
