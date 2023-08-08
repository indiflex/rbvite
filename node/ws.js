// import http from 'http';  // ESM
const http = require('http'); // CJS
const server = http.createServer((req, res) => {
  res.write('Hello, Node!');
  res.end();
});

server.listen(80, () => console.log('Server Started at 80...'));
