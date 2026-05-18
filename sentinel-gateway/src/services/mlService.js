const axios = require("axios");

const analyzeWithML = async (telemetry) => {
  try {
    const response = await axios.post(
      `${process.env.ML_SERVICE_URL}/analyze`,
      {
        ip: telemetry.network.ip,
        method: telemetry.request.method,
        path: telemetry.request.path,
        userAgent: telemetry.client.userAgent,
        riskScore: telemetry.security.riskScore,
        statusCode: 0,
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