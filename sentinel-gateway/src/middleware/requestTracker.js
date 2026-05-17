const requestTracker = (req, res, next) => {
  const requestId = `REQ_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)}`;

  req.requestContext = {
    requestId,
    requestStart: Date.now(),
  };

  next();
};

module.exports = {
  requestTracker,
};