// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserData = require('./models/user-data.model');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.post('/api/saveUserData', async (req, res) => {
  const { userId, data } = req.body;
  // Find the user by ID and update their data
  try {
    const updatedData = await UserData.findOneAndUpdate({ userId: userId }, { $set: { data: data } }, { new: true, upsert: true });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});