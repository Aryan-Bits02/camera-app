const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (index.html, client.js, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Keep a record of active sockets (for debugging)
let activeClients = new Set();

io.on('connection', socket => {
    console.log(`[${new Date().toISOString()}] Client connected: ${socket.id}`);
    activeClients.add(socket.id);

    // Receive camera frames (base64-encoded images)
    socket.on('cameraFrame', data => {
        // Broadcast to all other clients (e.g., your laptop viewer)
        socket.broadcast.emit('remoteFrame', data);
    });

    // Notify when the client disconnects
    socket.on('disconnect', () => {
        console.log(`[${new Date().toISOString()}] Client disconnected: ${socket.id}`);
        activeClients.delete(socket.id);
    });
});

// Simple endpoint to show how many active streams
app.get('/status', (req, res) => {
    res.json({ clients: Array.from(activeClients) });
});

// Start listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});