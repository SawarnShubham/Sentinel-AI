const { body, validationResult } = require("express-validator");

const validateRegistration = [
  body("name")
  .notEmpty()
  .withMessage("Name is required")
  .isLength({ min: 4 })
  .withMessage("Name must be at least 4 characters"),

  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isStrongPassword()
    .withMessage("Password must be a strong password"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    next();
  }
];

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      });
    }

    next();
  }
];

module.exports = {
  validateRegistration,
  validateLogin
};
