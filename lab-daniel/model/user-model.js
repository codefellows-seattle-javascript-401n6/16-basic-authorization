'use strict';
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user');
const bcrypt = require('bcrypt');


const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

User.methods.comparePass = function(password) {
   return bcrypt.compare(password, this.password);
};

User.pre('save', function(next) {
    if(this.isNew) {
      console.log('New user', this);
      bcrypt.hash(this.password, 5)
      .then(hash => {
          this.password = hash;
          next()
      }).catch(err => console.log('error', err));
    }else {
      console.log('old user', this);
      next();
    }
});

module.exports = mongoose.model('User', User);