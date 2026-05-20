const { isBlocked } = require("../services/attackTracker");

const RISK_BLOCK_THRESHOLD =
  Number(process.env.RISK_BLOCK_THRESHOLD);

const decisionEngine = (req, res, next) => {
  const riskScore = req.telemetry.security.riskScore;
  const mlPrediction =
    req.telemetry.security.mlPrediction;

  const ip = req.telemetry.network.ip;

  // Brute-force / temporary IP block
  if (isBlocked(ip)) {
    req.telemetry.security.decision = "BLOCK";
    req.telemetry.security.blockSource =
      "brute-force-engine";

    return res.status(403).json({
      success: false,
      message:
        "IP temporarily blocked due to suspicious activity",
    });
  }

  // Rule-based risk engine block
  if (riskScore >= RISK_BLOCK_THRESHOLD) {
    req.telemetry.security.decision = "BLOCK";
    req.telemetry.security.blockSource =
      "risk-engine";

    return res.status(403).json({
      success: false,
      message: "Request blocked by Sentinel risk engine",
    });
  }

  // AI anomaly detection block
  if (mlPrediction === "suspicious") {
    req.telemetry.security.decision = "BLOCK";
    req.telemetry.security.blockSource =
      "ai-engine";

    return res.status(403).json({
      success: false,
      message: "Request blocked by Sentinel AI engine",
      reasons:
        req.telemetry.security.aiReasons || [],
    });
  }

  req.telemetry.security.decision = "ALLOW";
  req.telemetry.security.blockSource = "none";

  next();
};

module.exports = {
  decisionEngine,
};