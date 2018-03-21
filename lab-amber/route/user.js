'use strict';

const express = require('express');
const mongoose = require('mongoose');

const User = require('../model/user.js');
const storage = require('../lib/user.js');

const router = express.Router();

router.post('/api/signup', (req, res) => {
  let authHeader = req.get('Authorization');
  console.log('auth header', authHeader);
  if (!authHeader) {
    res.status(400);
    res.send('Must provide username/password');
    return;
  }
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  storage.save(newUser).then(user => {
    console.log('user saved', user);
    res.send(user);
  }).catch(err => {
    console.error(err);
  });
});

router.get('/api/signin', (req, res) => {
  let authHeader = req.get('Authorization');
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
});

module.exports = router;