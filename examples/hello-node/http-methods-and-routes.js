const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if(req.url === '/') {
    if(req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, Node.js');
    }
    if(req.method === 'POST') {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      });
      req.on('end', _ => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(body)
      });
    }
  } else if(req.url === '/json') {
    if(req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({'message': 'Hello, Node.js'}));
    }
    if(req.method === 'POST') {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      });
      req.on('end', _ => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'message': body}));
      });     
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running 'http-methods-and-routes' on port ${port}/`);
});