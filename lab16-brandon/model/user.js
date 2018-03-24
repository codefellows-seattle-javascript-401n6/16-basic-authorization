'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

User.methods.checkPassword = function(attempt) {
  return bcrypt.compare(attempt, this.password);
 }
 
User.pre('save', function(next) {
  if (this.isNew) {
    bcrypt.hash(this.password, 10).then(hash => {
      this.password = hash;
      next();
    }).catch(err => console.error(err));
  } else {
    next();
  };
});
 

module.exports = mongoose.model('User', User);
