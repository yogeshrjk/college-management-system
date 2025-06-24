const express = require("express");
const router = express.Router();
const user = require("../model/user-model");
const upload = require("../middleware/multer");

// User Signup
router.post("/signup", upload.single("profilePic"), async (req, res) => {
  try {
    const newUser = await user.create({
      ...req.body,
      profilePic: req.file?.path || undefined,
    });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Profile Picture Upload
router.post("/upload-profile", upload.single("profilePic"), (req, res) => {
  res.json({
    message: "Upload successful",
    imageUrl: req.file.path, // Cloudinary URL
  });
});

router.get("/:id", async (req, res) => {
  try {
    const foundUser = await user.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(foundUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
