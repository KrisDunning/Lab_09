'use strict';

const emailModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    foreignKey: { type: DataTypes.INTEGER, required: true},
    emailTo: { type: DataTypes.STRING, required: true },
    subject: {type: DataTypes.STRING},
    body: {type: DataTypes.STRING },
  },
  );

  return model;
};

module.exports = emailModel;
