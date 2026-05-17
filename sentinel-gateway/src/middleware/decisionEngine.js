const decisionEngine = (req, res, next) => {
  const riskScore = req.telemetry.security.riskScore;

  if (riskScore >= 30) {
    req.telemetry.security.decision = "BLOCK";

    return res.status(403).json({
      success: false,
      message: "Request blocked by Sentinel",
    });
  }

  req.telemetry.security.decision = "ALLOW";

  next();
};

module.exports = {
  decisionEngine,
};