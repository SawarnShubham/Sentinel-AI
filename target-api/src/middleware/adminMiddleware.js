const verifyAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access forbidden. Admin only"
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  verifyAdmin
};