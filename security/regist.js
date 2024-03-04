const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assuming you have a User model
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});
