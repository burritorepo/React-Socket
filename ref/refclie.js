const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000/games');

/* socket.on('welcome', (msg) => {
    console.log(msg);
    socket.emit('hola', 'CLIENT: HOLA');
}) */

/* socket.emit('joinRoom', 'game4');

socket.on('newUser', (res) => {
    console.log(res);
});

socket.on('hola', msg => {
    console.log(msg);
})

socket.on('success', msg => {
    console.log(msg);
}) */

