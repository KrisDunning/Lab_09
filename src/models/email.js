'use strict';
const sendMail = require('../middleware/nodeMail');

const emailModel = (sequelize, DataTypes) => {
  const model = sequelize.define('emails', {
    to: {type: DataTypes.STRING},
    subject: {type: DataTypes.STRING},
    body: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER},
  },
  );

  model.sendEmail= async function (emailInfo){
    console.log(emailInfo);
    return (await sendMail(emailInfo));
  };
  return model;
};

module.exports = emailModel;
