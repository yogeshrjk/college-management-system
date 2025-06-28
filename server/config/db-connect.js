const mongoose = require("mongoose");

async function connectMongoDb(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { connectMongoDb };
