'use strict';
/**
   * Logger Middleware
   * @module Logger
   *  @return  Logs to console the req.method and req.path
   */
const logger = (req, res, next) => {
  console.log('REQUEST:', req.method, req.path);
  next();
};

module.exports = logger;
