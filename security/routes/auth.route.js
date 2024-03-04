
`auth.route.js`
const express = require('express');
const router = express.Router();
const { verifySignUp } = require('../middleware/verifySignUp');
const controller = require('../controllers/auth.controller');

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail
  ],
  controller.register
);

router.post("/auth/signin", controller.login);

module.exports = router;
