const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const canAccess = require('../helpers/auth');
const policies = require('../helpers/policy-allow');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/auth/login')
  .post(authCtrl.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/auth/random-number')
  .get(canAccess, policies.isAllowed, authCtrl.getRandomNumber);

module.exports = router;
