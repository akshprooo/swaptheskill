const express = require('express');
const app = express();

const cors = require('cors');

// load environment variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// connect to the database
const configDB = require('./config/db');
configDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// sample route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// all routes
app.use('/api/auth', require('./routes/auth.routes'));

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});