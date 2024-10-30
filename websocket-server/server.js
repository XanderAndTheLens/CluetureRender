// websocket-server/server.js
import 'dotenv/config';
import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import axios from 'axios';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      "http://localhost:5173",     // Localhost for SvelteKit app
      "http://192.168.0.211:5173",  // Local network IP for SvelteKit app
      "https://clueturerender.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }
});

const PORT = process.env.PORT || process.env.LOCAL_PORT;

console.log('Starting websocket sever on port:', PORT );

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});

const APIPrompt = "Take this fact about someone and extend the sentence to make it funnier.";

let queue = [];
let apiCallCount = 0;

// Function to make the answer funnier using OpenAI API
async function makeAnswerFunnier(answer) {
  try {
    apiCallCount++;
    console.log(`API Call Count: ${apiCallCount}`);
    console.log("Making API call to OpenAI...");

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: APIPrompt },
          { role: "user", content: answer },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("API call successful. Response received:", response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error);
    return "Could not make the answer funnier due to an error.";
  }
}

// Process each answer in the queue one at a time
async function processQueue() {
  if (queue.length === 0) {
    console.log("Queue is empty, exiting processQueue.");
    return;
  }

  const { answer, socket, gameCode, username } = queue[0];
  console.log(`Processing answer for game ${gameCode}: "${answer}" from user "${username}"`);

  try {
    const funnyAnswer = await makeAnswerFunnier(answer);
    console.log("Emitting funny answer back to the client:", { username, answer: funnyAnswer });

    // Emit the modified answer back to all clients in the game room
    io.to(gameCode).emit('user_answered', { username, answer: funnyAnswer });
  } finally {
    queue.shift(); // Remove the processed answer from the queue
    console.log("Answer processed and removed from queue.");
    processQueue(); // Process the next answer in the queue
  }
}

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_game', (data) => {
    const { gameCode, username } = data;
    socket.join(gameCode);
    console.log(`User ${username} joined game: ${gameCode}`);
  });

  socket.on('answer_question', (data) => {
    const { gameCode, answer, username } = data;
    console.log(`Received answer from ${username} for game ${gameCode}: ${answer}`);
    queue.push({ answer, socket, gameCode, username });

    // Only start processing if the queue has just one item
    if (queue.length === 1) {
      processQueue(); // Start processing the queue if it's not already processing
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
