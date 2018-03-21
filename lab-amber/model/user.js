'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

User.pre('save', function(next) {
  if (this.isNew) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      this.password = hash;
      this.psswordHash = hash;
      next();
    });
  } else {
    console.info('Old user', this);
  }
  next();
});

User.checkPassword = function(attempt) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(attempt, this.password, (err, valid) => {
      if (err) {
        reject(err);
      }
      resolve(valid);
    });
  });
};

module.exports = mongoose.model('User', User);