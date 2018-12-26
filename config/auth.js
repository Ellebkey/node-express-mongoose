const jwt = require('jsonwebtoken');
const config = require('./config.js');

module.exports = function(req, res, next) {
  if( typeof req.headers.authorization !== "undefined" ) {
    try {
      req.user = jwt.verify(req.headers.authorization, config.jwtSecret);
      return next();
    } catch(err) {
      return res.status(401).json({
        error: {
          msg: 'Failed to authenticate token!'
        }
      });
    }
  } else {
    return res.status(401).json({
      error: {
        msg: 'User is not logged, you need a token!'
      }
    });
  }
};