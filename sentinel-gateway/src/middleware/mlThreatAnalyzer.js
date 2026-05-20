const { analyzeWithML } = require("../services/mlService");

const mlThreatAnalyzer = async (req, res, next) => {
  const mlResult = await analyzeWithML(req.telemetry);

  req.telemetry.security.anomalyScore =
    mlResult.anomalyScore;

  req.telemetry.security.mlPrediction =
    mlResult.prediction;
  
  req.telemetry.security.aiReasons =
    mlResult.reasons || [];

  next();
};

module.exports = {
  mlThreatAnalyzer,
};