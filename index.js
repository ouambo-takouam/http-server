const http = require('http');

const PORT = 3000;

/* http.createServer(requestListener)
   server => eventEmitter
   'req', 'res' are streams

   -- this is short hand --
   const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
         JSON.stringify({
            id: 1,
            name: 'Sir SOUOP Georges',
         })
      );
   });
*/

const server = http.createServer();

const friends = [
	{
		id: 0,
		name: 'Georges S.',
	},
	{
		id: 1,
		name: 'Patrick O.',
	},
	{
		id: 2,
		name: 'Eunice M.',
	},
];

// (req, res) => {} => eventListener or requestListener
server.on('request', (req, res) => {
	const items = req.url.split('/');
	// '/friends/2' => ['', 'friends', '2']

	if (req.method === 'POST' && items[1] === 'friends') {
		req.on('data', (buffer) => {
			const jsonData = buffer.toString();
			console.log(`Request: ${jsonData}`);

			const friend = JSON.parse(jsonData);
			friends.push(friend);
		});
		req.pipe(res);
	} else if (req.method === 'GET' && items[1] === 'friends') {
		// res.writeHead(200, { 'Content-Type': 'application/json' });
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');

		if (items.length === 3) {
			res.end(JSON.stringify(friends[+items[2]]));
		} else {
			res.end(JSON.stringify(friends));
		}
	} else if (req.method === 'GET' && items[1] === 'messages') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<body>');
		res.write('<ul>');
		res.write('<li>Hello Georges</li>');
		res.write('<li>What about React.js library</li>');
		res.write('</ul>');
		res.write('</body>');
		res.write('</html>');
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

// localhost = 127.0.0.1
server.listen(PORT, () => {
	console.log(`Listining on port ${PORT}...`);
});
