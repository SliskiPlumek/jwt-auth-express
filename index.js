const jwt = require("jsonwebtoken");

function authenticateToken(secretName, refreshAccessToken) {
  return async function (req, res, next) {
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
      if (err.name === 'TokenExpiredError' && err.expiredAt) {
        try {
          const newToken = await refreshAccessToken(err.expiredAt, secretName);
          req.tokenRefreshed = true;
          req.newAccessToken = newToken;
        } catch (refreshErr) {
          return next(refreshErr)
        }
      }
      
      req.isAuth = false;
      err.statusCode = 401;
      return next(err);
    }

    if (!decodedToken) {
      req.isAuth = false;
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