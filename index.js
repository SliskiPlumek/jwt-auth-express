const jwt = require("jsonwebtoken");

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
      err.statusCode = 401; 
      return next(err); 
    }

    if (!decodedToken) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      return next(error); 
    }

    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
  };
}

module.exports = authenticateToken;

