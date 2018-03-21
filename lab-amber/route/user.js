'use strict';

const express = require('express');
const mongoose = require('mongoose');

const User = require('../model/user.js');
const storage = require('../lib/user.js');

const router = express.Router();

// router.post('/api/signup', (req, res) => {
//   let authHeader = req.get('Authorization');
//   console.log('header:', authHeader);
//   if (!authHeader) {
//     res.status(400);
//     res.send('Must provide username/password');
//     return;
//   }
//   let payload = authHeader.split('Basic ')[1];
//   let decoded = Buffer.from(payload, 'base64').toString();
//   let [username, password] = decoded.split(':');
//   console.log('credentials:', username, password);
//   res.send({
//     username: username,
//     email: email
//   });
// });

router.get('/api/signin', (req, res) => {
  let authHeader = req.get('Authorization');
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
});

module.exports = router;