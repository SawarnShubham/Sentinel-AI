const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Sentinel MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Sentinel Gateway running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });