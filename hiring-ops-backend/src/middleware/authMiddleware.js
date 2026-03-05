const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      error: "TOKEN_MISSING",
      message: "Authorization token not provided"
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    const user = await User.findById(decoded.userId)
      .select("-passwordHash");

    if (!user) {
      return res.status(401).json({
        error: "USER_NOT_FOUND",
        message: "User no longer exists"
      });
    }

    req.user = user;

    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "TOKEN_EXPIRED",
        message: "Access token expired"
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "INVALID_TOKEN",
        message: "Invalid token"
      });
    }

    return res.status(401).json({
      error: "AUTH_FAILED",
      message: "Authentication failed"
    });

  }

};

module.exports = protect;