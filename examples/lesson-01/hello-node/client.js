// Adapted from https://nodejs.dev/learn/making-http-requests-with-nodejs

const http = require('http')

const options = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/',
  method: 'GET'
}

const req = http.request(options, res => {
  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
