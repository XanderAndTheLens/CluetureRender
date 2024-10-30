// sveltekit-app/src/lib/socket.js
import { io } from 'socket.io-client';

// Dynamically set the WebSocket server URL based on environment variable
export const websocket_server = import.meta.env.VITE_WEBSOCKET_SERVER || import.meta.env.VITE_LOCAL_WEBSOCKET_SERVER;
const socket = io(websocket_server);

export default socket;
