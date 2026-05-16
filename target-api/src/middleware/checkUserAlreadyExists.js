const user = require("../models/User");
const checkUserAlreadyExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    checkUserAlreadyExists
};
