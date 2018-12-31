const Joi = require('joi');
const validator = require('../helpers/validation').validation;

exports.createUser = (req, res, next) => {
  const creatUserRules = Joi.object()
    .keys({
      email: Joi.string().email().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
    })
    .options({ allowUnknown: true }); // allow keys not defined

  validator(creatUserRules, req, res, next);
};
