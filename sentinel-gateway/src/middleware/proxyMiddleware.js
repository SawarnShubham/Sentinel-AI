const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyMiddleware = createProxyMiddleware({
  target: "http://localhost:5000",
  changeOrigin: true,
  logLevel: "debug",
  onError: (err, req, res) => {
    console.error("Proxy Error:", err.message);

    res.status(500).json({
      success: false,
      message: "Sentinel proxy failed",
    });
  },
});

module.exports = proxyMiddleware;