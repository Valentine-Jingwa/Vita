const express = require('express');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating JWTs
const User = require('../models/User'); // Import the User model
const router = express.Router(); // Create a new router object

/**
 * POST /signup
 * Route to register a new user.
 */
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Extract username, email, and password from request body
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with a cost factor of 10
    const user = await User.create({ username, email, password: hashedPassword }); // Create a new user document
    res.status(201).json({ message: 'User created successfully', userId: user._id }); // Respond with success message and user ID
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status code
  }
});

/**
 * POST /signin
 * Route to authenticate a user and issue a JWT.
 */
router.post('/signin', async (req, res) => {
  try {
    const { loginId, password } = req.body; // Extract loginId and password from request body
    const user = await User.findOne({
      $or: [{ username: loginId }, { email: loginId }] // Check for user by username or email
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" }); // User not found, return 404
    }
    
    const isMatch = await bcrypt.compare(password, user.password); // Compare provided password with stored hash
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" }); // Passwords do not match, return 400
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '999h' }); // Sign a new token
    res.json({ token }); // Respond with JWT
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors with a 500 status code
  }
});

module.exports = router; // Export the router for use in the main server file
