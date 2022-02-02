const express = require('express');

const app = express();
const port = 3000;

app.get('/search', (req, res) => {
  const { term, limit } = req.query;
  res.set('Content-Type', 'text/plain');
  res.send(`${term} ${limit}`);
});

app.get('/:name', (req, res) => {
  const name = req.params.name;
  res.json({ name });
});

app.listen(port, () => {
  console.debug(`Server running 'route-parameters' on port ${port}`);
});