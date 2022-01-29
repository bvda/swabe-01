// Adapted from https://nodejs.dev/learn/build-an-http-server

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if(req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({'message': 'Hello, Node.js'}));
  }
  if(req.method == 'POST') {
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', _ => {
      res.end(body)
    })
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running 'hello-node' on port ${port}/`);
});