const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const User = require('../models/user.model');

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  token = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
