import React, { Component, useState } from 'react'
import { MapContainer } from './map.container';

function Login() {
    const [roomID, setRoomId] = useState('123');
    const [user, setUser] = useState('client');

    return (
        <div>
            <MapContainer room={roomID} user={user} />
        </div>
    );
};

export {
    Login
};