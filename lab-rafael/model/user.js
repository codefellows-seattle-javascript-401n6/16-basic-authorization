'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', next => {
  if (this.isNew) {
    console.log('New user', this);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
