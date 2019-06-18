import React, { Component } from 'react';
import { Routing } from './router/router';
import './components/map/map.css';

// Socket
import { SocketContext } from './socket_context/socket.context';
import io from 'socket.io-client';
import './index.css';

const ordersSocket = io.connect('http://localhost:4000/orders');
console.log(ordersSocket);

export default class App extends Component {
  render() {
    return (
      <div>
        <SocketContext.Provider value={ordersSocket}>
          <h1>Main View</h1>
          <Routing />
        </SocketContext.Provider>
      </div>
    )
  }
};
