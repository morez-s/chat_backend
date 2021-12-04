require('dotenv').config();
require('./../config/database');
const express = require('express');

const app = express();

app.use(express.json());

// routes
var routes = require('./../router/index');
app.use('/', routes);

module.exports = app;
