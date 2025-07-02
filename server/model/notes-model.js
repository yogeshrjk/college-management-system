const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  subject: String,
  semester: String,
  author: String,
  uploadDate: String,
  downloads: String,
  fileSize: String,
  fileType: String,
  fileUrl: String,
  description: String,
});

module.exports = new mongoose.model("notes", notesSchema);
