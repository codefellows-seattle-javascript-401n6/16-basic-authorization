'use strict';

const express = require('express');
const User = require('./model/user-model');
const router = require('./routes/routes');

router.route('/signup')
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

rouster.route('/signin').get((req, res) => {
  let authHeader = req.get('Authorization');
  console.log('header:', authHeader);
  if (!authHeader) {
    res.status(401);
    res.send('Please provide username and password');
    return;
  }

  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  User.findOne({ username: username })
    .then(user => {
      consloe.log(user);
      if (user === null) {
        res.send('user not found');
      }
      if (user.password === password) {
        res.send('Logged in');
      } else {
        res.sendStatus(401).send('Invalid Password');
      }
    })
    .catch(err => res.send(err.message));

  console.log('usrnpass:', username, password);

});

module.exports = router;