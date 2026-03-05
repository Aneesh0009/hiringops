const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken } = require("../utils/generateTokens");
const authService = require("../services/authService");

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired refresh token",
    });
  }
};

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      email: result.user.email,
    });
  } catch (error) {
    res.status(400).json({ code : 400, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(
      req.body.email,
      req.body.password,
    );

    const { accessToken, refreshToken, user } = result;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      email: user.email,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ code : 400, message: error.message });
  }
};

const logout = async (req, res) => {

  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(204).send();
  }

  const user = await User.findOne({ refreshToken: token });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("refreshToken");

  res.json({
    message: "Logged out successfully"
  });

};


module.exports = {
  refreshToken,
  register,
  login,
  logout
};
