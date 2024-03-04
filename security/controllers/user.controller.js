const User = require('../models/user.model');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    res.status(200).send({ message: "User profile updated successfully!", user });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
