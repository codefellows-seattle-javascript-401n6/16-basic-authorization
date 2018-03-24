'use strict'
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const user = require('./model/user-model');
const router = require('./route/routes');

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));