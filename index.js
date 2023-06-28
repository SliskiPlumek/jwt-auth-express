const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

function authenticateToken(secretName) {
  return function (req, res, next) {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      req.isAuth = false;
      return next();
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, secretName);
    } catch (err) {
      err.statusCode = 500;
      req.isAuth = false
      return next()
    }
    if (!decodedToken) {
      req.isAuth = false
      return next()
    }
    req.userId = decodedToken.userId;
    req.isAuth = true
    next();
  };
}

module.exports = authenticateToken;
