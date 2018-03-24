'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../model/user.js');
const getCreds = require('../lib/authorization.js');

const router = express.Router();

router.post('/signup', express.json(), (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => res.sendStatus(400));
});

router.get('/signin', (req, res) => {
  let [username, password] = getCreds(req, res);
  User.findOne({username}).then(user => {
    user.checkPassword(password).then(result => {
      if (result) {
        res.status(200).send(user);
      } else {
        res.sendStatus(401);
      }
    });
  }); 
 });
 
 module.exports = router;
