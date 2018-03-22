'use strict';


const express = require('express');
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./route/routes.js');

mongoose.connect('mongodB://localhost/lab-16');
//mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(bodyParser);

app.use('/api', route);

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});
