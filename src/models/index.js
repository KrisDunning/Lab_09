'use strict';

const userModel = require('./users.js');
const emailModel = require('./email.js');
const { Sequelize, DataTypes } = require('sequelize');

// process.env.DATABASE_URL  in first OR position when done with testing
const DATABASE_URL = 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);
const users= userModel(sequelize, DataTypes);
const emails = emailModel(sequelize, DataTypes);

users.hasMany(emails, {foreignKey: 'userId', sourceKey: 'id'});
emails.belongsTo(users, {foreignKey: 'userId', targetKey: 'id'});

module.exports = {
  db: sequelize,
  users: users,
  emails: emails,
};
