const {
  recordRequest,
} = require("../services/attackTracker");

const requestTracker = (req, res, next) => {
  const requestId = `REQ_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)}`;

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    req.ip;

  recordRequest(ip);

  req.requestContext = {
    requestId,
    requestStart: Date.now(),
  };

  next();
};

module.exports = {
  requestTracker,
};