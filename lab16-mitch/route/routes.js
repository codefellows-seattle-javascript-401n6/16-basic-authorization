'use strict';

const express = require('express');
const router = express.Router();
const User = require('../model/user.js');

router.route('/users')
  .get((req, res) => {
    console.log('Inside router.get');
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.log('Inside router.catch')
        res.send(err.message);
      });
  });


router.route('/signup')
  .post((req, res) => {
    console.log('router.route.post -- req', req.body)
    return new User(req.body).save()
      .then(user => {
        res.sendStatus(200);
        console.log('router.route.post', user);
      })
      .catch(err => {
        console.log('router.route.catch', err)
        res.sendStatus(400).send(err.message)
      });
  });


router.route('/signin').get((req, res) => {
  let authHeader = req.get('Authorization');
  console.log('router.route.get -- Header', authHeader);
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
      console.log('router.route.get user.findOne --', user);
      if (user === null) {
        res.send('User not found');
      }
      if (user.password === password) {
        res.send('Login credentials accepted.')
      } else {
        res.sendStatus(401).send('Login credentials incorrect.');
      }
    })
    .catch(err => res.send(err.message));
  console.log('User Credentials:', username, password);
});

module.exports = router;