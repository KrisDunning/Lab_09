'use strict';
const inquirer = require('inquirer');
const fetch = require('node-fetch');
const base64 = require('base-64');


const prompt = inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'functions',
      choices: [
        'Create a new user',
        'Log in',
        'send an email',
        'view your sent emails',
      ],
    },
  ])
  .then(async (answers) => {
    if (answers.functions === 'Create a new user') {
      let username = 'jack';
      let password = 'pass';
      let email = 'jack@example.com';

      let body = {
        username: username,
        password: password,
        email: email,
      };

      const headers = `Authorization: Basic ${username}:${password}`;

      console.log(headers);
      console.log(JSON.stringify(body));
      
      const response = await fetch('http://localhost:3002/signup', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
      });

      const data = await response.json();
      console.log(data);
    }
  });

module.exports = prompt;