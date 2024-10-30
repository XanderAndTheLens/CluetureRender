// src/lib/socket.js
import { io } from 'socket.io-client';

// Define WebSocket server URL
const socket = io("http://192.168.0.211:3000");  // Replace with your local IP

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

export default socket;
