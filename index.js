const http = require('http');
const app = require('./app/index');

const server = http.createServer(app);

// server listening 
const port = process.env.API_PORT;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
