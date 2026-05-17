const SecurityEvent = require("../models/SecurityEvent");

const saveSecurityEvent = async (telemetry) => {
  try {
    await SecurityEvent.create(telemetry);
  } catch (error) {
    console.error(
      "Failed to save security event:",
      error.message
    );
  }
};

module.exports = {
  saveSecurityEvent,
};