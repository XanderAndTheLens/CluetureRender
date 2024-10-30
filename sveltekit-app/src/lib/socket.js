// sveltekit-app/src/lib/socket.js
import { io } from 'socket.io-client';

// Dynamically set the WebSocket server URL based on environment variable
export const websocket_server = import.meta.env.VITE_WEBSOCKET_SERVER || import.meta.env.VITE_LOCAL_WEBSOCKET_SERVER;

// export const websocket_sever = "https://websocket-server-yl51.onrender.com"
// export const websocket_sever = "http://192.168.0.211:3000"


const socket = io(websocket_server);

export default socket;
