const SecurityEvent = require("../models/SecurityEvent");

const getSecurityStats = async (req, res) => {
  try {
    const totalRequests =
      await SecurityEvent.countDocuments();

    const blockedRequests =
      await SecurityEvent.countDocuments({
        "security.decision": "BLOCK",
      });

    const allowedRequests =
      await SecurityEvent.countDocuments({
        "security.decision": "ALLOW",
      });

    const aiBlocked =
      await SecurityEvent.countDocuments({
        "security.blockSource": "ai-engine",
      });

    const riskBlocked =
      await SecurityEvent.countDocuments({
        "security.blockSource": "risk-engine",
      });

    const bruteForceBlocked =
      await SecurityEvent.countDocuments({
        "security.blockSource":
          "brute-force-engine",
      });

    const suspiciousEvents =
      await SecurityEvent.countDocuments({
        "security.mlPrediction": "suspicious",
      });

    res.status(200).json({
      success: true,
      stats: {
        totalRequests,
        allowedRequests,
        blockedRequests,
        aiBlocked,
        riskBlocked,
        bruteForceBlocked,
        suspiciousEvents,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch security stats",
      error: error.message,
    });
  }
};
const getSecurityEvents = async (req, res) => {
  try {
    const events = await SecurityEvent.find()
      .sort({ timestamp: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch security events",
      error: error.message,
    });
  }
};
const getAnomalies = async (req, res) => {
  try {
    const anomalies = await SecurityEvent.find({
      "security.mlPrediction": "suspicious",
    })
      .sort({ timestamp: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      anomalies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch anomalies",
      error: error.message,
    });
  }
};
const getBlockedEvents = async (req, res) => {
  try {
    const blocked = await SecurityEvent.find({
      "security.decision": "BLOCK",
    })
      .sort({ timestamp: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      blocked,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blocked events",
      error: error.message,
    });
  }
};

module.exports = {
  getSecurityStats,
  getSecurityEvents,
  getAnomalies,
  getBlockedEvents,
};