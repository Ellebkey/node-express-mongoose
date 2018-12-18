const User = require('../models/user.model');
const logger = require('../../config/winston');

const controller = {};

/**
 * Load user and append to req.
 */
controller.getById = async(req, res, next, id) =>{
  try {
    const user = await User.get(id);
    logger.info('getting user ' + id);
    if (!user) {
      const e = new Error('User does not exist');
      e.status = httpStatus.NOT_FOUND;
      return next(e);
    }
    req.user = user;
    return next();
  } catch (err) {
    logger.error('Error in getting user', err);
    return next(err);
  }
}

/**
 * Get user
 * @returns {User}
 */
controller.get = (req, res) => {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
controller.create = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
controller.update = (req, res, next) => {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
controller.list = (req, res, next) => {
  logger.error('sending all users...');

  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
controller.remove = (req, res, next) => {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = controller;