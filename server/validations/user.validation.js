const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }),
    params: Joi.object().keys({
      d: Joi.string().guid().required(),
    }),
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: Joi.object().keys({
      username: Joi.string().required(),
    }),
    params: Joi.object().keys({
      userId: Joi.string().guid().required(),
    }),
  }
};
