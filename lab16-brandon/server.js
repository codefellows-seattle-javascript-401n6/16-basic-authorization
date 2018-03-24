'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const authRouter = require('./route/auth-router.js');
mongoose.connect('mongodb://localhost/16-basic-auth');

app.use('/api', authRouter);

const server = app.listen(PORT, () => {
  console.log(`server is running: ${PORT}`);
});