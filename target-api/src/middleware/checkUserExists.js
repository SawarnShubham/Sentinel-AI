const User = require("../models/User");

const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  checkUserExists
};