const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const router = require('./routes');

const app = express();
const db = require('./db/db.js');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './../client/dist')));
app.use(router);

module.exports = app;
