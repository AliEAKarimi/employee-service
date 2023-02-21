const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req.url);
})

server.listen(81, '127.0.0.1', () => {
    console.log('Server listening on port 81')
})