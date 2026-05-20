const express = require("express");
const cors = require("cors");
const proxyMiddleware = require("./middleware/proxyMiddleware");
const { requestInspector } = require("./middleware/requestInspector");
const { requestTracker } = require("./middleware/requestTracker");
const { riskAnalyzer } = require("./middleware/riskAnalyzer");
const { responseTracker } = require("./middleware/responseTracker");
const {decisionEngine} = require("./middleware/decisionEngine");
const { mlThreatAnalyzer } = require("./middleware/mlThreatAnalyzer");
const securityRoutes = require("./routes/securityRoutes");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Sentinel Gateway running",
  });
});

app.use("/api/security", securityRoutes);
app.use(requestTracker);
app.use(requestInspector);
app.use(riskAnalyzer);
app.use(mlThreatAnalyzer);
app.use(responseTracker);
app.use(decisionEngine);
app.use(proxyMiddleware);



module.exports = app;