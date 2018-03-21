'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');


let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('listening on: http://localhost', PORT);
});
