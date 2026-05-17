const responseTracker = (req, res, next) => {
  res.on("finish", () => {
    req.telemetry.response.statusCode = res.statusCode;
    req.telemetry.timing.responseTimeMs =
      Date.now() - req.requestContext.requestStart;

    console.log("FINAL SENTINEL TELEMETRY:", req.telemetry);
  });

  next();
};

module.exports = {
  responseTracker,
};