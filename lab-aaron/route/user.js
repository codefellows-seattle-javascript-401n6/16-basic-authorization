'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const storage = require('../lib/user');
const router = express.Router();

router.post('/api/signup', (request, response) => {
  let authHeader = request.get('Authorization');
  if (!authHeader) {
    response.status(400);
    response.send('Must Provide Username/Password.');
    return;
  }
  if (request.body.username === undefined 
      || request.body.email === undefined 
      || request.body.password === undefined) {
    response.status(404);
    response.send('Some Data is UNDEFINED');
    return;
  }
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  let newUser = {
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
  };
  storage.save(newUser).then((user) => {
    response.send({
      username: user.username,
      email: user.email,
    });
  })
    .catch((error) => {
      console.log('ERROR(/route/user{line-39}): ', error);
    });
});

router.get('/api/signin', (request, response) => {
  let authHeader = request.get('Authorization');
  if (!authHeader) {
    response.status(400);
    response.send('Must Provide Valid Username / Password.');
    return;
  }
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  let hash;
  storage.get(username).then((user) => {
    hash = user.hash;
    let isValid = bcrypt.compareSync(password, hash);
    if (isValid) {
      response.send('User is Authorized.');
    } else {
      response.status(401);
      response.send('User is NOT Authorized.');
    }
  });
});

module.exports = router;