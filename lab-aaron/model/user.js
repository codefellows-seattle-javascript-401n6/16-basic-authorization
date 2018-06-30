'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: {type: String},
  email: {type: String},
  password: String,
});

User.pre('save', function (next) {
  if (this.isNew) {
    bcrypt.hash(this.password, 10, (error, hash) => {
      if (error)
        return next(error);
      this.password = hash;
      this.passwordHash = hash;
      next();
    });
  } else {
    console.log('user is NOT NEW');
    next();
  };
});

module.exports = mongoose.model('User', User);