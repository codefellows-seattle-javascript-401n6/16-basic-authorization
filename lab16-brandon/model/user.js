'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

User.pre('save', function(next) {
  if (this.isNew) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      this.password = hash
      this.passwordHash = hash
    console.log('New user', this);
  // } else {
  //   console.log('old user', this);
  next();
});

module.exports = mongoose.model('User', User);