// Adapted from https://github.com/expressjs/express/blob/master/examples/multi-router/controllers/api_v2.js

const express = require('express');

const api_v2 = express.Router();

api_v2.get('/', function(req, res) {
  res.send('Hello from APIv2 root route.');
});

api_v2.get('/users', function(req, res) {
  res.send('List of APIv2 users.');
});

module.exports = api_v2;