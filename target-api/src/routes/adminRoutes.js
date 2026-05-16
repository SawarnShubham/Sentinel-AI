const express = require("express");
const { verifyAccessToken } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  verifyAccessToken,
  verifyAdmin,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome admin dashboard"
    });
  }
);

module.exports = router;