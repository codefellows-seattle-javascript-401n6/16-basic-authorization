'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const User = require('../model/user');
const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost:test';

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Mongoose connected');
  })
  .catch((error) => {
    console.log('ERROR(/lib/user{line-15}): ', error);
  });

const save = (user) => {
  let userModel = new User({
    username: user.username,
    email: user.email,
    password: user.password,
  });
  return new Promise((resolve, reject) => {
    userModel.save((error, savedUser) => {
      if (error) {
        console.log('ERROR(/lib/user{line-27}): ', error);
      }
      resolve(savedUser);
    });
  });
};

const get = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      username: username,
    }, (error, user) => {
      resolve(user);
    });
  });
};

module.exports = {save, get};