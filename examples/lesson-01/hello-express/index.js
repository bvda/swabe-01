const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    'message': 'Hello, Express.js!'
  });
});

app.listen(port, _ => {
  console.debug(`Server running 'hello-express' on port ${port}`);
});