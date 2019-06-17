import React, { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../socket_context/socket.context';

function MapContainer(props) {
    let [msg, setMsg] = useState('');

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('joinRoom', props.room);
        socket.on('success', data => {
            setMsg(msg = data);
        });
        socket.on('newUser', data => {
            console.log('inside Room', data);
        })
    }, [setMsg]);

    /* socket.emit('insideMap', "Now I'm in!");
    socket.on('server', message => {
        setMsg(msg = message);
    }) 
     
    socket.emit('joinRoom',props.room);    
        socket.on('newUser',casa=>{
            console.log('data',casa);
        })

        socket.on('success', data=>{
            console.log('data',data);
        }) */

    return (
        <div>
            <h1>{msg}</h1>
        </div>
    );
}

export {
    MapContainer
};