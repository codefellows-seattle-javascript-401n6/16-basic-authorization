'use strict';


const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // findHash: {type: String, unique: true}
});

let User = mongoose.model('User', userSchema);


userSchema.methods.checkPass = function(password){
    return bcrypt.compare(password, this.password);
}

userSchema.pre('save', function())

// userSchema.methods.generateHash = function (password){
//     return new Promise((resolve, reject) => {
//         bcrypt.hash(password, 10, (err, hash) => {
//             if(err) return reject(err);
//             this.password = hash;
//             resolve(this);
//         });
//     });
// };

// userSchema.methods.compareHash = function (password) {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(password, this.password, (err, valid) => {
//             if (err) return reject(err);
//             if (!valid) return reject(err, 'wrong password');
//             resolve(this);
//         });
//     });
// };






module.exports = User;