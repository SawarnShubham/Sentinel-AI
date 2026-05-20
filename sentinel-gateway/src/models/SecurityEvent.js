const mongoose = require("mongoose");

const securityEventSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
    },

    network: {
      ip: String,
      forwardedIp: String,
      protocol: String,
      host: String,
      origin: String,
      referer: String,
    },

    request: {
      method: String,
      path: String,
      query: Object,
      contentType: String,
      contentLength: Number,
      headerCount: Number,
    },

    client: {
      userAgent: String,
      hasAuthHeader: Boolean,
      authType: String,
    },

    timing: {
      requestStart: Number,
      responseTimeMs: Number,
    },

    security: {
      riskScore: Number,
      flags: [String],
      decision: String,
      blockSource: String,
      anomalyScore: Number,
      mlPrediction: String,
      aiReasons: [String],
    },

    response: {
      statusCode: Number,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("SecurityEvent", securityEventSchema);
