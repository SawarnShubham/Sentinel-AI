const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};
const verifyRefreshToken = (token) => {
  return jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
};