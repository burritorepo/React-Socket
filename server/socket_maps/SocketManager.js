const ordersSocket = require('../index.js');

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    TYPING } = require('./events')

/* const { createUser, createMessage, createChat } = require('../Factories') */
/* let connectedUsers = {}
let communityChat = createChat() */

let active = false;
let update = false;
let users = [];

module.exports = function (socket) {

    console.log('connected');

    let addedUser = false;

    socket.on('joinRoom', (room) => {

        console.log(room);
        socket.join(room);

        socket.to(room).emit('success', 'Usuario dentro de OrderID');

        socket.on('add user', (username) => {

            console.log('llego este', username);
            if (addedUser) return;
            socket.username = username.user;
            let new_count = users.length;

            console.log('increase users', new_count);

            let new_user = {
                username: username.user,
                active: active,
                lat: null,
                lng: null,
                update: false
            };

            users.push(new_user);
            console.log('total', users);
        });

        // Sending back users ARRAY to any user that connects to our SERVER
        socket.on('load_init', (data) => {
            socket.emit('load_init', users);
        })

        socket.on('disconnect', () => {

            for (var i = 0; i < users.length; i++)
                if (users[i].username === socket.username) {
                    socket.broadcast.emit('remove_marker', {
                        username: users[i].username
                    });
                    users.splice(i, 1);
                    break;
                }
            var new_count = users.length;
            console.log(new_count);
            console.log('remove marker');
        });


    });





    // console.log('new client has connected');
    // console.log("Socket Id:" + socket.id);

    /*  socket.on('insideMap', msg => {
         console.log(msg);
         socket.emit('server', 'Hola mortal!');
     }); */

    // socket.on('joinRoom', (room) => {
    //     socket.join(room);
    //     /* ordersSocket.to(room).emit('newUser', 'New player has join the room'); */
    //     socket.to(room).emit('success','you are in room 123');
    // }); 

    /* socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.emit('newUser', 'New player has join the room'); */
    /* io
        .of('/orders')
        .in(room)
        .emit('newUser', 'New player has join the room');}) */

    //     let sendMessageToChatFromUser;

    //     let sendTypingFromUser;

    //     //Verify Username
    //     socket.on(VERIFY_USER, (nickname, callback) => {
    //         if (isUser(connectedUsers, nickname)) {
    //             callback({ isUser: true, user: null })
    //         } else {
    //             callback({ isUser: false, user: createUser({ name: nickname }) })
    //         }
    //     })

    //     //User Connects with username
    //     socket.on(USER_CONNECTED, (user) => {
    //         connectedUsers = addUser(connectedUsers, user)
    //         socket.user = user

    //         sendMessageToChatFromUser = sendMessageToChat(user.name)
    //         sendTypingFromUser = sendTypingToChat(user.name)

    //         io.emit(USER_CONNECTED, connectedUsers)
    //         console.log(connectedUsers);

    //     })

    //     //User disconnects
    //     socket.on('disconnect', () => {
    //         if ("user" in socket) {
    //             connectedUsers = removeUser(connectedUsers, socket.user.name)

    //             io.emit(USER_DISCONNECTED, connectedUsers)
    //             console.log("Disconnect", connectedUsers);
    //         }
    //     })


    //     //User logsout
    //     socket.on(LOGOUT, () => {
    //         connectedUsers = removeUser(connectedUsers, socket.user.name)
    //         io.emit(USER_DISCONNECTED, connectedUsers)
    //         console.log("Disconnect", connectedUsers);

    //     })

    //     //Get Community Chat
    //     socket.on(COMMUNITY_CHAT, (callback) => {
    //         callback(communityChat)
    //     })

    //     socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    //         sendMessageToChatFromUser(chatId, message)
    //     })

    //     socket.on(TYPING, ({ chatId, isTyping }) => {
    //         sendTypingFromUser(chatId, isTyping)
    //     })

    // }
    // /*
    // * Returns a function that will take a chat id and a boolean isTyping
    // * and then emit a broadcast to the chat id that the sender is typing
    // * @param sender {string} username of sender
    // * @return function(chatId, message)
    // */
    // function sendTypingToChat(user) {
    //     return (chatId, isTyping) => {
    //         io.emit(`${TYPING}-${chatId}`, { user, isTyping })
    //     }
    // }

    // /*
    // * Returns a function that will take a chat id and message
    // * and then emit a broadcast to the chat id.
    // * @param sender {string} username of sender
    // * @return function(chatId, message)
    // */
    // function sendMessageToChat(sender) {
    //     return (chatId, message) => {
    //         io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({ message, sender }))
    //     }
    // }

    // /*
    // * Adds user to list passed in.
    // * @param userList {Object} Object with key value pairs of users
    // * @param user {User} the user to added to the list.
    // * @return userList {Object} Object with key value pairs of Users
    // */
    // function addUser(userList, user) {
    //     let newList = Object.assign({}, userList)
    //     newList[user.name] = user
    //     return newList
    // }

    // /*
    // * Removes user from the list passed in.
    // * @param userList {Object} Object with key value pairs of Users
    // * @param username {string} name of user to be removed
    // * @return userList {Object} Object with key value pairs of Users
    // */
    // function removeUser(userList, username) {
    //     let newList = Object.assign({}, userList)
    //     delete newList[username]
    //     return newList
    // }

    // /*
    // * Checks if the user is in list passed in.
    // * @param userList {Object} Object with key value pairs of Users
    // * @param username {String}
    // * @return userList {Object} Object with key value pairs of Users
    // */
    // function isUser(userList, username) {
    //     return username in userList
    // 

}