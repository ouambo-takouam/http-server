const http = require('http');

const PORT = 3000;

// http.createServer(requestListener)
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(
		JSON.stringify({
			data: 'Hello world',
		})
	);
});

server.listen(PORT, () => {
	console.log(`Listining on port ${PORT}...`);
});
