// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware to enable CORS (allows cross-origin requests)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Import and use route handlers
app.use('/api/artists', require('./routes/artists'));
app.use('/api/albums', require('./routes/albums'));
app.use('/api/songs', require('./routes/songs'));

// Define the port from .env or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
