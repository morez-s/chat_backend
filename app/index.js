require('dotenv').config();
require('./../config/database');
const express = require('express');

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// routes
var routes = require('./../router/index');
app.use('/', routes);

module.exports = app;
