'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/user');

const userSchema = Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', next => {
    let user = this;

    if (user.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
        next();
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

