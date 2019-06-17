import React, { Component, useState } from 'react'
import { MapContainer } from './map.container';

function Login() {
    const [roomID, setRoomId] = useState('123');

    return (
        <div>
            <MapContainer room={roomID} />
        </div>
    );
};

export {
    Login
};