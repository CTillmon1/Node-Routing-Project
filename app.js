
//Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser.
//Solution: Use Node.js to perform profile look up and serve our template via http 

//1. Create web Server
const router = require("./router.js");
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  router.home(req, res);
  router.user(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//2. Handle Http Get/ and Post/ route i.e. Home
