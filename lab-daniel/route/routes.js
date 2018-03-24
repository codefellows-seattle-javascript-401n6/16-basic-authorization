'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user-model');

//GET REQUEST
router.get('/', (req, res) => {
    User.find()
    .then(results => {
        res.send(results);
    });
})

router.get('/signin', (req, res) => {
    let authHeader = req.get('AUTHORIZATION');
    if (!authHeader) {
        res.sendStatus(401);
        res.send('NEED USERNAME/PASSWORD');
        return;
    }

  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  console.log('credentials:', username, password);
  res.send('IT WORKS!');
});

//POST REQUEST
router.post('/signup', (req, res) => {
    console.log('req.body:', req.body)
    User.create(req.body)
    .then(() => { res.sendStatus(200)
    })
    .catch(() => res.sendStatus(400));
});

module.exports = router;