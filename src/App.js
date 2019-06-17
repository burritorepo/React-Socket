import React, { Component } from 'react';
import {Login} from './component/login/login'
// Socket
import { SocketContext } from './Socket/socket';
import io from 'socket.io-client';
import './index.css';

const socket = io('http://localhost:4000/orders');

class App extends Component {
  render() {
    console.log(socket);
    return (
      <SocketContext.Provider value={socket}>
        <Login />
      </SocketContext.Provider>
    );
  }
}

export default App;
