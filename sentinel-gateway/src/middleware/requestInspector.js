const requestInspector = (req, res, next) => {
  const telemetry = {
    requestId: req.requestContext.requestId,

    network: {
      ip: req.ip,
      forwardedIp: req.headers["x-forwarded-for"] || null,
      protocol: req.protocol,
      host: req.headers.host || null,
      origin: req.headers.origin || null,
      referer: req.headers.referer || null,
    },

    request: {
      method: req.method,
      path: req.originalUrl,
      query: { ...req.query },
      contentType: req.headers["content-type"] || null,
      contentLength: req.headers["content-length"] || 0,
      headerCount: Object.keys(req.headers).length,
    },

    client: {
      userAgent: req.headers["user-agent"] || "Unknown",
      hasAuthHeader: !!req.headers.authorization,
      authType: req.headers.authorization
        ? req.headers.authorization.split(" ")[0]
        : null,
    },

    timing: {
      requestStart: req.requestContext.requestStart,
    },

    security: {
      riskScore: 0,
      flags: [],
      decision: "PENDING",
    },

    response: {
      statusCode: null,
    },

    timestamp: new Date().toISOString(),
  };

  req.telemetry = telemetry;

//   res.on("finish", () => {
//     console.log("FINAL SENTINEL TELEMETRY:", req.telemetry);
//   });
  next();
};

module.exports = {
  requestInspector,
};
