const Accesslist = require('acl');

// Using the memory backend
const acl = new Accesslist(new Accesslist.memoryBackend()); // eslint-disable-line new-cap

/**
 * Invoke Permissions
 */
exports.invokeRolesPolicies = () => {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/users',
      permissions: '*'
    }, {
      resources: '/api/users/:userId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/users',
      permissions: ['get', 'post']
    }, {
      resources: '/api/users/:userId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/users',
      permissions: ['get']
    }, {
      resources: '/api/articles/:userId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Policy Allows
 */
exports.isAllowed = async (req, res, next) => {
  const roles = (req.user) ? req.user.roles : ['guest'];

  try {
    const isAllowed = await acl.areAnyRolesAllowed(roles, req.baseUrl, req.method.toLowerCase());
    if (isAllowed) {
      // Access granted! Invoke next middleware
      return next();
    }

    return res.status(403).json({
      error: {
        msg: 'User is not authorized'
      }
    });
  } catch (e) {
    return res.status(500).json({
      error: {
        msg: 'Unexpected authorization error'
      }
    });
  }
};
