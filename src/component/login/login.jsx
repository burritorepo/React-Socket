import React, { Component, useState } from 'react'
import {Navbar} from '../componentWithSocket';

function Login() {
    const [roomID, setRoomId] = useState('123');

    return (
        <div>
            <Navbar room={roomID} />
        </div>
    )
}

export {
    Login
};