// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const noteRoutes = require('./dat');
app.use('/api/notes', noteRoutes);

// Start the server
app.listen(8000, () => {
    console.log('Server started on port 8000');
});
