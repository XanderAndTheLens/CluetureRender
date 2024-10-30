// sveltekit-app/src/lib/socket.js
import { io } from 'socket.io-client';

// Dynamically set the WebSocket server URL based on environment variable
const socket = io(import.meta.env.VITE_WS_URL || "http://localhost:3000");

export default socket;
