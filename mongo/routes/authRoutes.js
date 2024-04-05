//authRoutes
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { loginId, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: loginId }, { email: loginId }]
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Assuming passwords are hashed and not plain text as shown in your screenshot
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    // JWT_SECRET would be an environment variable holding your JWT secret key
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '999h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
