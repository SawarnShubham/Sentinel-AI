const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyMiddleware = createProxyMiddleware({
  target: process.env.TARGET_API_URL,
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