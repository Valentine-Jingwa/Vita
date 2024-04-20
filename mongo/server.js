// Load environment variables from .env file
require('dotenv').config();

// Importing necessary Node.js modules
const express = require('express');
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Routes import
const authRoutes = require('./routes/authRoutes');

const app = express(); // Create an Express application

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming requests with JSON payloads

// Establish connection to MongoDB using connection string from .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Use the new URL parser instead of the deprecated one
  useUnifiedTopology: true, // Use the unified topology layer
}).then(() => console.log('MongoDB connected')) // Log success on successful connection
  .catch(err => console.error('MongoDB connection error:', err)); // Log any connection errors

// Default route
app.get('/', (req, res) => res.send('Vita Works')); // Basic route to confirm the server is running

// Authentication routes setup
app.use('/api/auth', authRoutes); // Use authRoutes for any calls to /api/auth

// Set up the server to listen on a port defined in the environment variables or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start listening on the defined port
