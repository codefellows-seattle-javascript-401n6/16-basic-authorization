'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRouter = require('./route/auth-router.js');
const errors = ('..lib/error-middleware.js');

dotenv.load();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/16-basic-auth');

// app.use(authRouter);
// app.use(errors);

const server = app.listen(PORT, () => {
  console.log(`server is running: ${PORT}`);
});

server.isRunning = true;