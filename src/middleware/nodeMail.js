'use strict';
/**
   * NodeMailer middleware
   * @module sendMail
   *  @return {object} Returns information returned from the transporter of nodemailer
   */
const nodemailer = require('nodemailer');

const sendMail= async (emailInfo) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: emailInfo.user.email, // sender address
    to: emailInfo.information.to, // list of receivers
    subject: emailInfo.information.subject, // Subject line
    text: emailInfo.information.body, // plain text body
  });
  info.testURL=nodemailer.getTestMessageUrl(info);
  return ({info});
};
module.exports = sendMail;
