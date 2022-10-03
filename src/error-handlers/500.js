'use strict';
/**
 * 500 handler
 * @module 500
 * @return {(string|object)} The 500 error message
 */
module.exports = function (err, req, res, next) {
  const error = err.message ? err.message : err;
  const errorObject = {
    status: 500,
    message: error,
  };
  res.status(500).json(errorObject);
};
