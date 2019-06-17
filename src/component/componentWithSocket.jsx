import React, { Component, useContext, useState } from 'react'
import { SocketContext } from '../Socket/socket';

function Navbar(props) {
    let [msg, setMsg] = useState('');
    const socket = useContext(SocketContext);
  
    socket.on('welcome', (message) => {
        setMsg(msg = message);
    });
    
    socket.emit('joinRoom',props.room);

    socket.on('newUser',casa=>{
        console.log('data',casa);
    })

    socket.on('success', data=>{
        console.log('data',data);
    })

    return (
        <div>
            <h1>{msg}</h1>
        </div>
    );
}

export {
    Navbar
}