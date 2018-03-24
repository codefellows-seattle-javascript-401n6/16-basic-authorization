'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const router = require('./route/routes.js');

const app = express();

app.use('/api', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const PORT = process.env.PORT || 3000;

//mongoose.connect(process.env.MONGODB_URI);

// app.get('/', (req, res) => {
//     res.send('Welcome! Try to access <a href="/secret">/secret</a> to see a secret recipe!');
// })

// app.get('/secret', (req, res) => {
//     let authHeader = req.get('Authorization');
//     console.log('header:', authHeader);
//     if(!authHeader) {
//         res.status(401);
//         res.send('Must provide username/password');
//         return;
//     }
// let payload = authHeader.split('Basic ')[1];
// let decoded = Buffer.from(payload, 'base64').toString();
// let [username, password] = decoded.split(':');
// console.log('credentials:',username, password);

// res.send('Secret Recipe.');
// });


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});
