const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const http = require('http').createServer(app);

http.listen(port, console.log('Running on port 4000'));

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('new client has connected');
    socket.emit('welcome', 'SERVER: Hello!');

    socket.on('hola', msg => {
        console.log(msg);
    })
})

const chatRooms = ['game1', 'game2', 'game3']

io
    .of('/games')
    .on('connection',
        socket => {
            socket.emit('welcome', 'Hello welcome to the games area!')
            socket.on('joinRoom', (room) => {
                if (chatRooms.includes(room)) {
                    socket.join(room);
                    io
                        .of('/games')
                        .in(room)
                        .emit('newUser', 'New player has join the room');
                    return socket.emit('success', 'User connected successfully')
                }

                socket.emit('hola', 'Hola no existe ese room');

                /* socket.disconnect(); */
            })
        }
    )



