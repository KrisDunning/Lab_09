'use strict';
const nodemailer = require('nodemailer');
const emailDB = require ('../models');

// before we hit email route
// token auth
// user object

// set info object with to/from/subject/body

//after send email
// save the messageID, previewURL, body to DB.

// async..await is not allowed in global scope, must use a wrapper
const sendMail= async (emailInfo) => {
  console.log('NodeMail emailInfo:   ',emailInfo);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: emailInfo.user.email, // sender address
    to: emailInfo.information.to, // list of receivers
    subject: emailInfo.information.subject, // Subject line
    text: emailInfo.information.text, // plain text body
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

};
sendMail().catch(console.error);



module.exports = sendMail;
