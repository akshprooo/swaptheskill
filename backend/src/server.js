const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// DB
const configDB = require('./config/db');
configDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/utils', require('./routes/utils.routes'));
app.use('/api/chat', require('./routes/chat.routes'));

// SOCKET.IO SETUP
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "*", // restrict later
    methods: ["GET", "POST"]
  }
});

// Attach socket logic
require('./sockets/chat.socket')(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
