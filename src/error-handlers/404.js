'use strict';
/**
 * 404 handler
 * @module 404
 * @return {(string|object)} 404 message
 */
function handle404(req, res, next) {

  const errorObject = {
    status: 404,
    message: 'Sorry, we could not find what you were looking for',
  };
  console.log(req.body);
  res.status(404).json(errorObject);
}

module.exports = handle404;
