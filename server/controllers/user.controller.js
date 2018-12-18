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
controller.read = (req, res) => {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
controller.create = async(req, res, next) => {
  const user = new User( req.body);
  try {
    const savedUser = await user.save();
    res.json(savedUser)
  } catch (err) {
    logger.error('Error in getting user', err);
    return err; 
  }
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
controller.update = async(req, res, next) => {
  let user = req.user;
  let a = req.body;
  let updateUser = {...user, a};

  console.log(updateUser, '\n\n\n');
  console.log(user);

  try {
    const savedUser = await updateUser.save();
    res.json(savedUser)
  } catch (err) {
    logger.error('Error updating the user', err);
    return err; 
  }
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
controller.list = async(req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;
 
  try {
    const users = await User.list({ limit, skip })
    logger.info('getting users list');
    return res.json(users);
  } catch (err) {
    logger.error('Error in getting users', err);
    return next(err);
  }
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