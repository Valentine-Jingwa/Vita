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
  const { loginId, password } = req.body; // `loginId` can be either an email or a username

  try {
      // Check if loginId includes an '@', indicating it's an email
      const criteria = loginId.includes('@') ? { email: loginId } : { username: loginId };
      
      const user = await User.findOne(criteria);
      if (!user) {
          return res.status(404).send('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).send('Invalid credentials');
      }

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, username: user.username, email: user.email });
  } catch (error) {
      res.status(500).send(error.message);
  }
});





module.exports = router;
