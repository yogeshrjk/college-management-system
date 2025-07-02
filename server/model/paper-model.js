const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  title: String,
  subject: String,
  semester: String,
  year: String,
  examType: String,
  duration: String,
  maxMarks: Number,
  uploadDate: String,
  downloads: String,
  fileSize: String,
  fileUrl: String,
});

module.exports = new mongoose.model("papers", paperSchema);
