import https from 'https';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

const options=  {
  key: fs.readFileSync(path.join(__dirname, '../selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, '../selfsigned.crt'))
}

app.get('', (req, res) => {
  res.json({
    "message": "Hello, HTTPS! 👋"
  });
});

https.createServer(options, app).listen(port, () => {
  console.log(`Running 'secure-http' on ${port}`);
});