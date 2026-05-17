const riskAnalyzer = (req, res, next) => {
  let riskScore = 0;
  const flags = [];

  if (req.telemetry.client.userAgent === "Unknown") {
    riskScore += 20;
    flags.push("missing-user-agent");
  }

  if (
    req.telemetry.request.path.includes("/api/auth/login")
  ) {
    riskScore += 15;
    flags.push("sensitive-auth-endpoint");
  }

  if (
    Number(req.telemetry.request.contentLength) > 10000
  ) {
    riskScore += 30;
    flags.push("large-payload");
  }

  req.telemetry.security.riskScore = riskScore;
  req.telemetry.security.flags = flags;
  req.telemetry.security.decision = "ALLOW";

  next();
};

module.exports = {
  riskAnalyzer,
};