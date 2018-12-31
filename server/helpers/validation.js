const Joi = require('joi');

/** Validation function */
exports.validation = (joiObject, req, res, next) => {
  const validate = Joi.validate(req.body, joiObject);

  if (validate.error) {
    const message = validate.error.message.replace(/['"[]+/g, '').replace('child ', '');
    return res.status(422)
      .json({
        message,
        code: 422,
        error: validate.error
      });
  }
  return next();
};
