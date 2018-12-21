const User = require('../models/user.model');
const logger = require('../../config/winston');

const controller = {};

/**
 * Load user and append to req.
 */
controller.getById = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    logger.info(`getting user  ${id}`);
    req.user = user;
    return next();
  } catch (err) {
    logger.error(`Error in getting user ${err}`);
    return res.status(400).send({
      message: err
    });
  }
};

/**
 * Get user
 * @returns {User}
 */
controller.read = (req, res) => res.json(req.user);

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
controller.create = async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (err) {
    logger.error(`Error in getting user ${err}`);
    return err;
  }
};

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
controller.update = async (req, res) => {
  const { user } = req;

  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  try {
    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (err) {
    logger.error(`Error updating user ${err}`);
    return err;
  }
};

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
controller.list = async (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;

  try {
    const users = await User.list({ limit, skip });
    logger.info('getting users list');
    return res.json(users);
  } catch (err) {
    logger.error(`Error in getting users ${err}`);
    return next(err);
  }
};

/**
 * Delete user.
 * @returns {User}
 */
controller.remove = (req, res, next) => {
  const { user } = req;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
};

module.exports = controller;
