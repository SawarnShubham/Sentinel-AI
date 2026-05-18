const { isBlocked } = require("../services/attackTracker");

const RISK_BLOCK_THRESHOLD =
  Number(process.env.RISK_BLOCK_THRESHOLD);

const decisionEngine = (req, res, next) => {
  const riskScore = req.telemetry.security.riskScore;
  const mlPrediction =
    req.telemetry.security.mlPrediction;

  const ip = req.telemetry.network.ip;

  if (isBlocked(ip)) {
    req.telemetry.security.decision = "BLOCK";

    return res.status(403).json({
      success: false,
      message:
        "IP temporarily blocked due to suspicious activity",
    });
  }

  if (riskScore >= RISK_BLOCK_THRESHOLD) {
    req.telemetry.security.decision = "BLOCK";

    return res.status(403).json({
      success: false,
      message: "Request blocked by Sentinel risk engine",
    });
  }

  if (mlPrediction === "suspicious") {
    req.telemetry.security.decision = "BLOCK";

    return res.status(403).json({
      success: false,
      message: "Request blocked by Sentinel AI engine",
    });
  }

  req.telemetry.security.decision = "ALLOW";

  next();
};

module.exports = {
  decisionEngine,
};