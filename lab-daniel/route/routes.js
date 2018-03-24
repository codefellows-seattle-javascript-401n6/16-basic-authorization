'use strict';
const express = require('express');
const router = express.Router();

router.get('/signin', (req, res) => {
    res.send('Hello, would you like to signup?');
});

router.post('/signup', express.json(), (req, res) => {
    res.send(req.body);
})



module.exports = router;