const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// SIGN UP
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, name, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, name, age });
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// SIGN IN
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });

    // Include the username in the response
    res.status(200).json({ token, username: user.username /*, age: user.age - if you have an age field */ });
  } catch (error) {
    res.status(500).send(error.message);
  }
});





module.exports = router;
