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
    .get((req, res)=> {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.send(err.message));
    })
    .post ((req, res) => {
        new User(req.body)
        .save()
        .then(user => res.json(user))
        .catch(err => res.sendStatus(400).send(err.message));
    });


router.route('/signin').get((req, res) => {
    let authHeader = req.get('Authorization');
    console.log('Header', authHeader);
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