const express = require("express");
const {
  register,
  login,
  refreshAccessToken
} = require("../controllers/authController");

const {
  validateRegistration,
  validateLogin,
} = require("../middleware/authValidation");

const {
  checkUserAlreadyExists,
} = require("../middleware/checkUserAlreadyExists");

const { checkUserExists } = require("../middleware/checkUserExists");

const router = express.Router();

router.post(
  "/register",
  validateRegistration,
  checkUserAlreadyExists,
  register,
);


router.post("/login", validateLogin, checkUserExists, login);
router.post(
  "/refresh",
  refreshAccessToken
); 

module.exports = router;
