'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models');
const {emails} = require('../models');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});

authRouter.post('/emails', bearerAuth, async (req, res, next) => {
  const emailInfo={
    user: req.user,
    information:req.body,
  };

  const sendMail = await emails.sendEmail(emailInfo);
  console.log('Info returned after sending an email:  ',sendMail);
  let emailRecord = await emails.create({
    foreignKey: emailInfo.user.id,
    to:emailInfo.information.to,
    subject: emailInfo.information.subject,
    body:emailInfo.information.text,
  });

  res.status(200).send(sendMail);
});
module.exports = authRouter;
