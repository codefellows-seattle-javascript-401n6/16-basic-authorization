'use strict';

const express = require('express');
// const debug = require('debug')('lab-16-darcy:server');
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb://localhost/16-basic-auth');

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome! Try to access <a href="/secret">/secret</a> to see a secret recipe!');
});
    
app.get('/secret', (req, res) => {
  let authHeader = req.get('Authorization');
  console.log('header:', authHeader);
  if (!authHeader) {
    res.status(401);
    res.send('Must provide username/password');
    return;
  } 
    
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  console.log('credentials:', username, password);
    
  res.send('Secret Recipe.');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
//   debug(`Listening on: ${PORT}`);
  console.log('Listening on http://localhost: ' + PORT);
});

server.isRunning = true;