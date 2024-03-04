const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware/authJwt");
const controller = require('../controllers/user.controller');

router.get("/user/profile", [authJwt.verifyToken], controller.getUserProfile);

// Other user routes can be added here

module.exports = router;
