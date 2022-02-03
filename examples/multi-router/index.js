// Adapted from https://github.com/expressjs/express/blob/master/examples/multi-router/index.js

const express = require('express');

const port = 3000;
const app = express();

app.use(express.text());

app.use('/api/v1', require('./controllers/api_v1'));
app.use('/api/v2', require('./controllers/api_v2'));

app.get('/', function(req, res) {
  res.send('Hello from root route.');
});

app.post('/', function(req, res) {
  res.json({
    message: req.body
  });
});

app.listen(port, _ => {
  console.debug(`Server running 'multi-router' on port ${port}`);
});