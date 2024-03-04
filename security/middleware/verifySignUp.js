const User = require('../models/user.model');

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check for duplicate username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Check for duplicate email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

// Add additional checks as necessary, such as checkRolesExisted if you have roles

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  // checkRolesExisted, // If you have roles
};

module.exports = verifySignUp;
