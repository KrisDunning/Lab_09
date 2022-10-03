'use strict';
/**
   * Email Model
   * @module EmailModel
   * @param {to,subject,body} - The model for and email should have to,subject and body properties
   *  @return {model} - will return an email model
   */
const sendMail = require('../middleware/nodeMail');
const emailModel = (sequelize, DataTypes) => {
  const model = sequelize.define('emails', {
    to: {type: DataTypes.STRING},
    subject: {type: DataTypes.STRING},
    body: {type: DataTypes.STRING},
  },
  );
  model.sendEmail= async function (emailInfo){
    return (await sendMail(emailInfo));
  };
  return model;
};

module.exports = emailModel;
