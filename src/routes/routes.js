'use strict';
/**
   * Routes Collection
   * @module authRouter
   *  @return {module} Returns authRouter module
   */
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
    console.log('SIGN UP REQUEST:  ', req);
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

  const returnedInfo = await emails.sendEmail(emailInfo);
  console.log('Info returned after sending an email:  ',returnedInfo);
  let emailRecord = await emails.create({
    to:emailInfo.information.to,
    subject: emailInfo.information.subject,
    body:emailInfo.information.text,
    UserId: emailInfo.user.id,
  });
  console.log('EMAIL RECORD:   ', emailRecord);

  res.status(200).send(returnedInfo.info.testURL);
});

authRouter.get('/emails/:id',bearerAuth, permissions('delete'), async (req,res,next)=>{
  console.log('find by ID!!!!!!!!!!!!!');
  console.log('req.params :   ', req.params);
  //get the user id, get all emails from DB with matching foreign key
  const receivedEmails = await emails.findAll({where:{UserId:req.params.id}});
  res.status(200).json(receivedEmails);
});

authRouter.get('/emails', bearerAuth, async (req,res,next)=>{
  console.log('get all emails !!!!!!!!!!');
  const receivedEmails = await emails.findAll({});
  res.status(200).json(receivedEmails);
});

module.exports = authRouter;
