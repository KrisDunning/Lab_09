'use strict';

const userModel = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');

// process.env.DATABASE_URL  in first OR position when done with testing
const DATABASE_URL = 'sqlite:memory;' || 'sqlite:memory;';

const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
};
