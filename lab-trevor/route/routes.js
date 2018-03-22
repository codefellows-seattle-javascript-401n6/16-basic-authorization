'use strict';
const express = require('express');
const bodyParser =  require('body-parser');
const router = express.Router();
const User = require('../model/user.js');


router.post('/signup', express.json(), (req, res, next) => {
    User.create(req.body)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400));
});

router.get('/signin', (req, res) => {
    let [username, password] = getCreds(req, res);

    User.findOne({
        username
    }).then(user => {
        user.checkPass(password).then(result => {
            if(result){
                res.sendStatus(200);
            } else{
                res.sendStatus(401);
            }
        })
    })
});



module.exports = router;