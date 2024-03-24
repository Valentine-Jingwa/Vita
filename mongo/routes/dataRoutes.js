// dataRoutes.js

const express = require('express');
const router = express.Router();
const UserData = require('../models/user-data.model');

// Endpoint to save user data
router.post('/saveUserData', async (req, res) => {
  const { userId, data } = req.body;
  try {
    const userData = await UserData.findOneAndUpdate(
      { userId: mongoose.Types.ObjectId(userId) }, // Convert string ID to ObjectId
      { $push: { data: data } },
      { new: true, upsert: true }
    );
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;