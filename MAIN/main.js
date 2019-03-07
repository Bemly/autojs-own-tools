const http = require('http'); 
const os = require('os');
const os.type(hsg);
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("" + hsg);
});