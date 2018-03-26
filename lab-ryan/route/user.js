'use strict';

const express = require('express');
const User = require('../model/user');
const getAuth = require('../lib/authorization');

const router = express.Router();

// router.post('/signup', express.json(), (req, res) => {

//     User.create(req.body)
//         .then(() => res.sendStatus(200))
//         .catch(() => res.sendStatus(400))
//     });

router.post('/signup', express.json(), (req, res) => {
    User.create(req.body).then(user => {
        res.sendStatus(200);
    }).catch(err => res.sendStatus(400));
});

// router.get('/signin', (req, res) => { 
//     res.send('Hello World!');
// });

router.get('/signin', (req, res) => {
    let [username, password] = getAuth(req, res); //see demo lab for notation

    User.findOne({
        username
    }).then(user => {
        user.checkPassword(password).then(result => {
            if(result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        });
    });
});

module.exports = router;
