'use strict';
const sendMail = require('../middleware/nodeMail');

const emailModel = (sequelize, DataTypes) => {
  const model = sequelize.define('emails', {
    foreignKey: { type: DataTypes.INTEGER, required: true},
    to: {type: DataTypes.STRING},
    subject: {type: DataTypes.STRING},
    body: {type: DataTypes.STRING},
  },
  );

  model.sendEmail= async function (emailInfo){
    console.log(emailInfo);
    await sendMail(emailInfo);

  };


  return model;
};

module.exports = emailModel;
