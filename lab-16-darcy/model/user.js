'use strict';

const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});

User.pre('save', function(next) {
  if (this.isNew) {
    console.log('New user: ', this);
    bcrypt.hash(this.password, 10, (err, hash) => {
      this.password = hash;
      next();
    });
  } else {
    console.log('Old user: ', this);
    next();
  }
});

module.exports = mongoose.model('User', User);