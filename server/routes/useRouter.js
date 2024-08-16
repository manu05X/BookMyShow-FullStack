// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get current user route
router.get("/get-current-user", authMiddleware, getCurrentUser);

module.exports = router;
