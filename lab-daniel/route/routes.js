'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user-model');
const getCred = require('../lib/getCred');


router.get('/signin', (req, res) => {
    let [username, password] = getCred(req, res);
    User.findOne({
        username: username 
    })
    .then(user => {
        return user.comparePass(password)
        .then(results => {
            console.log('RESULTS! ', results);
            if(results) {
                res.sendStatus(200);
            }
            if(!result){
                res.sendStatus(401);
            }
        }).catch((err) => {
            res.sendStatus(401);
        })
    })
});

//POST REQUEST
router.post('/signup', (req, res) => {
    User.create(req.body)
    .then(() => {res.sendStatus(200)
    })
    .catch(() => res.sendStatus(400));
});

module.exports = router;