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
server.on('request', (req, res) => {
	if (req.url === '/friends') {
		// res.writeHead(200, { 'Content-Type': 'application/json' });
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(
			JSON.stringify({
				id: 1,
				name: 'Sir SOUOP Georges',
			})
		);
	} else if (req.url === '/messages') {
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
	}
});

server.listen(PORT, () => {
	console.log(`Listining on port ${PORT}...`);
});
