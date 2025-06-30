const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    message: String,
    type: String,
    action: String,
    date: String,
    time: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("activities", activitySchema);
