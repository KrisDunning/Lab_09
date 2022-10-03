'use strict';
/**
   * Model Index
   *  The Model Index Page
   *  @returns {db,users,emails} - exports all models from this one file
   */
const userModel = require('./users.js');
const emailModel = require('./email.js');
const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = 'sqlite:memory';
const sequelize = new Sequelize(DATABASE_URL);
const users= userModel(sequelize, DataTypes);
const emails = emailModel(sequelize, DataTypes);
users.hasMany(emails);
emails.belongsTo(users);

module.exports = {
  db: sequelize,
  users: users,
  emails: emails,
};
