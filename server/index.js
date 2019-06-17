const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const http = require('http').createServer(app);
const SocketManager = require('./socket_maps/SocketManager')

http.listen(port, console.log('Running on port 4000'));

const io = require('socket.io')(http);

io
.of('/orders')
.on('connection', SocketManager);

module.exports = io;