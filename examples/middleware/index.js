const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

var errorHandler = (err, req, res, next) => {
  const { message } = err;
  console.error(message);
  res.status(500).json({message});
}

app.options('*', cors())

app.use((req, res, next) => {
  console.log(req.headers)
  if(!req.headers['authorization']) {
    res.sendStatus(401);
  } else {
    next();
  }
});

app.get('/', cors(), (req, res) => {
  res.json({'message' : 'Hello, Middleware!'});
});

app.get('/error', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('Internal Server Error')
    } catch(err) {
      next(err);
    }
  }, 100);
});

app.use(errorHandler);

app.listen(port, _ => {
  console.log(`Server running 'middleware' on port ${port}`)
})