const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
  priority: String,
  category: String,
  isPinned: Boolean,
  author: String,
});

module.exports = mongoose.model("notices", noticeSchema);
