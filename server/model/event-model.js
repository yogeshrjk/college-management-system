const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  attendees: Number,
  category: String,
  status: String,
});

module.exports = mongoose.model("events", eventSchema);
