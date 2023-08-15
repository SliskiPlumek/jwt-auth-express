const jwt = require("jsonwebtoken");

function authenticateToken(secretName) {
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
      req.isAuth = false;
      err.statusCode = 401;
      return next(err);
    }

    if (decodedToken.expiresIn) {
      const expirationTime = new Date(decodedToken.expiresIn);
      const currentTime = new Date();

      if (expirationTime <= currentTime) {
        const newAccessToken = jwt.sign(
          {
            userId: decodedToken.userId,
            email: decodedToken.email,
            expiresIn: "15m",
          },
          secretName
        );

        req.tokenRefreshed = true;
        req.newAccessToken = newAccessToken;
      }
    }

    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
  };
}

module.exports = authenticateToken;
