const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const http = require('http').createServer(app);
const SocketManager = require('./socket_maps/SocketManager');

http.listen(port, console.log(`Running on port ${port}`));

const io = require('socket.io')(http);

const ordersSocket = io.of('/orders');

ordersSocket.on('connection', SocketManager);

module.exports = ordersSocket;
