const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  if(!req.headers['authorization']) {
    res.sendStatus(401)
  }
  next()
});

app.get('/', (req, res) => {
  res.json({'message' : 'Hello, Middleware!'})
});

app.get('/error', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('/error')
    } catch(err) {
      next(err)
    }
  }, 100);
});

app.use((err, req, res, next) => {
  console.error(err);
  next(err)
});

app.listen(port, _ => {
  console.log(`Server running 'middleware' on port ${port}`)
})