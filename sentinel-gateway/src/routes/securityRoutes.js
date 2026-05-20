const express = require("express");

const {
  getSecurityStats,
  getSecurityEvents,
  getAnomalies,
  getBlockedEvents,
} = require("../controllers/securityController");

const {
  authMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/stats", getSecurityStats);
router.get("/events", getSecurityEvents);
router.get("/anomalies", getAnomalies);
router.get("/blocked", getBlockedEvents);

module.exports = router;