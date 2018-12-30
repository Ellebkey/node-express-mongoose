const Joi = require('joi');

/** define validation schemas */
const create_user = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
  })
  .options({ allowUnknown: true }); //allow keys not defined

/** Define each validation*/
exports.createUser = (req, res, next) => validate(create_user, req, res, next);

/** Validation function*/
validate = (joi_object, req, res, next) => {
  const validate = Joi.validate(req.body, joi_object);

  if (validate.error) {
    return res.status(500)
      .json({
        message: validate.error.message,
        code: 422,
        error: validate.error
      });
  }
  return next();
}


