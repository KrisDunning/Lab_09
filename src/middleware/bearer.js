'use strict';
/**
   * Bearer Authorization
   * @module Bearer
   * @param {object} req.headers.authorization - The request must contain the users encoded login details
   *  @return {NextFunction|error} The next() function is called if role matches. Else "Invalid Login".
   */
const { users } = require('../models');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError(); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
};
