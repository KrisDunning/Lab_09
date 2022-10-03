'use strict';
/**
   * Model Index
   *  The Model Index Page
   *  @returns {db,users,emails} - exports all models from this one file
   */
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users.js');
const emailModel = require('./email.js');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});
console.log(DATABASE_URL);
//! For development uncomment this line and comment the block above
// const sequelize = new Sequelize(DATABASE_URL);

// initializing models
const users= userModel(sequelize, DataTypes);
const emails = emailModel(sequelize, DataTypes);

// making a relation between the tables
users.hasMany(emails);
emails.belongsTo(users);

module.exports = {
  db: sequelize,
  users: users,
  emails: emails,
};
