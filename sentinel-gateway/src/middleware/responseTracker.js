const {
  recordFailedLogin,
  resetAttackData,
} = require("../services/attackTracker");
const { saveSecurityEvent } = require("../services/telemetryLogger");

const responseTracker = (req, res, next) => {
  res.on("finish", () => {
    req.telemetry.response.statusCode = res.statusCode;
    req.telemetry.timing.responseTimeMs =
      Date.now() - req.requestContext.requestStart;

    const ip = req.telemetry.network.ip;
    const path = req.telemetry.request.path;

    if (path === "/api/auth/login") {
      if (res.statusCode === 401) {
        recordFailedLogin(ip);
      }

      if (res.statusCode === 200) {
        resetAttackData(ip);
      }
    }
    saveSecurityEvent(req.telemetry);
    console.log(`
================ SENTINEL SECURITY EVENT ================
REQUEST ID   : ${req.telemetry.requestId}
IP           : ${req.telemetry.network.ip}
METHOD       : ${req.telemetry.request.method}
PATH         : ${req.telemetry.request.path}
USER AGENT   : ${req.telemetry.client.userAgent}
RISK SCORE   : ${req.telemetry.security.riskScore}
FLAGS        : ${req.telemetry.security.flags.join(", ") || "None"}
DECISION     : ${req.telemetry.security.decision}
STATUS CODE  : ${req.telemetry.response.statusCode}
LATENCY      : ${req.telemetry.timing.responseTimeMs} ms
=========================================================
`);
  });

  next();
};

module.exports = {
  responseTracker,
};