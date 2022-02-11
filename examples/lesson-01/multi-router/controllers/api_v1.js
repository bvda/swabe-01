// Adapted from https://github.com/expressjs/express/blob/master/examples/multi-router/controllers/api_v1.js

const express = require('express');

const api_v1 = express.Router();

api_v1.get('/', function(req, res) {
  res.send('Hello from APIv1 root route.');
});

api_v1.get('/users', function(req, res) {
  res.send('List of APIv1 users.');
});

module.exports = api_v1;
