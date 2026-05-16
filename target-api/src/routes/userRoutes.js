const express = require("express");
const { verifyAccessToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", verifyAccessToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected profile accessed",
    user: req.user
  });
});

module.exports = router;