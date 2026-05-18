const axios = require("axios");
const { getAttackData } = require("./attackTracker");

const analyzeWithML = async (telemetry) => {
  try {
    const ip = telemetry.network.ip;
    const attackData = getAttackData(ip);

    const response = await axios.post(
      `${process.env.ML_SERVICE_URL}/analyze`,
      {
        ip,
        method: telemetry.request.method,
        path: telemetry.request.path,
        userAgent: telemetry.client.userAgent,
        riskScore: telemetry.security.riskScore,
        failedLoginCount: attackData.failedLogins,
        hasAuthHeader: telemetry.client.hasAuthHeader,
        contentLength:
          Number(telemetry.request.contentLength) || 0,
        headerCount: telemetry.request.headerCount,
        flags: telemetry.security.flags,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "ML service unavailable:",
      error.message
    );

    return {
      anomalyScore: 0,
      prediction: "unknown",
    };
  }
};

module.exports = {
  analyzeWithML,
};