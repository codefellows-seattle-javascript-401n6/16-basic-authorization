'use strict';
const express = require('express');
const router = express.Router();
const User = require('../model/user-model');

router.get('/signin', (req, res) => {
    res.send('Hello, would you like to signup?');
});

router.post('/signup', express.json(), (req, res) => {
    User.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));

});

module.exports = router;