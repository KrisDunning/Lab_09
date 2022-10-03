'use strict';
/**
 * Determines if user has correct role permission for request
 * @module ACL
 * @param {string} role - The role assigned to the request.user
 * @return {NextFunction|error} The next() function is called if role matches. Else "Access Denied".
 */
module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};
