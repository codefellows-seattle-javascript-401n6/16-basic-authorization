'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/user-login');

const Schema = mongoose.schema;

const userSchema = Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true}
});

userSchema.pre('save', next => {
  let user = this;

  if (user.isNew) {
    bycrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bycrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
    next();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);