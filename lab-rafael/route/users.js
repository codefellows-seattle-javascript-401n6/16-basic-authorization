'use strict';

const express = require('express');
const User = require('../model/user');
const router = express.Router();

router
  .route('/signup')
  .get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.send(err.message));
  })

  .post((req, res) => {
    new User(req.body)
      .save()
      .then(user => res.json(user))
      .catch(err => res.sendStatus(400).send(err.message));
  });

router.route('/signin').get((req, res) => {
  let authHeader = req.get('Authorization');
  console.log('header:', authHeader);
  if (!authHeader) {
    res.status(401);
    res.send('Must provide a username/password');
    return;
  }

  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  User.findOne({ username: username })
    .then(user => {
      console.log(user);
      if (user === null) {
        res.send('user not found');
      }
      if (user.password === password) {
        res.send('Logged In!');
      } else {
        res.sendStatus(401).send('Invalid password');
      }
    })
    .catch(err => res.send(err.message));

  console.log('credentials:', username, password);
});

module.exports = router;
