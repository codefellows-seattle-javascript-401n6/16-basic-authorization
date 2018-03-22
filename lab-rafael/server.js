'use strct';

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tuning in to port ${PORT}...`);
});
