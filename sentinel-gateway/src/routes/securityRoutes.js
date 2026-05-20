const express = require("express");
const {
  getSecurityStats,
  getSecurityEvents,
  getAnomalies,
  getBlockedEvents,
} = require("../controllers/securityController");

const router = express.Router();

router.get("/stats", getSecurityStats);
router.get("/events", getSecurityEvents);
router.get("/anomalies", getAnomalies);
router.get("/blocked", getBlockedEvents);

module.exports = router;