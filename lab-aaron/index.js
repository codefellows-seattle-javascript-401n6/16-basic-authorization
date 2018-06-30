'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const loginAPI = require('./route/user');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', loginAPI);

app.get('*', function(request, response) {
  response.send('Not Found: ', 404);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});