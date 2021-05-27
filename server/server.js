require('dotenv').config();

const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () =>
	console.log('\x1b[32m%s\x1b[0m', `☁️\xa0 SERVER RUNNING → PORT: ${server.address().port}`),
);
