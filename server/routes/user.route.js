const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('../controllers/user.controller');
const canAccess = require('../../config/auth');

const policies = require('../policies/user.policies');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of users */
  .get(canAccess, policies.isAllowed, userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
/** GET /api/users/:userId - Get user */
  .get(userCtrl.read)

  /** PUT /api/users/:userId - Update user */
  .put(userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.getById);

module.exports = router;
