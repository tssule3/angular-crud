const http = require('http');
const PORT = process.env.PORT || 3000;

const api = require('./backend/api');
api.set('port', PORT);
// const server = http.createServer((req, res) => {
//     res.end('server started');
// });
const server = http.createServer(api);
server.listen(PORT);