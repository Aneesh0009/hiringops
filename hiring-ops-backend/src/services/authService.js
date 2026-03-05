const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Company = require("../models/Company");

const { generateAccessToken, generateRefreshToken } =
  require("../utils/generateTokens");

const registerUser = async (data) => {

  const { email, password, role, fullName, companyName } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  let companyId = null;

  // recruiter registration flow
  if (role === "recruiter") {

    if (!companyName) {
      throw new Error("Company name is required for recruiter registration");
    }

    const company = await Company.create({
      name: companyName
    });

    companyId = company._id;
  }

  const user = await User.create({
    email,
    passwordHash,
    role,
    fullName,
    companyId
  });

  // assign recruiter as creator
  if (role === "recruiter") {
    await Company.findByIdAndUpdate(companyId, {
      createdBy: user._id
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

module.exports = {
  registerUser,
  loginUser
};