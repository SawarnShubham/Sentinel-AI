const express = require("express");
const cors = require("cors");
const proxyMiddleware = require("./middleware/proxyMiddleware");
const { requestInspector } = require("./middleware/requestInspector");
const { requestTracker } = require("./middleware/requestTracker");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Sentinel Gateway running",
  });
});

app.use(requestTracker);
app.use(requestInspector);
app.use(proxyMiddleware);

module.exports = app;