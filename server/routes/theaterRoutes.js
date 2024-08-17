// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addThreatre,
  updateThreatre,
  getAllThreatre,
  getAllThreatreByOwner,
  deleteThreatre,
} = require("../controllers/theatreController");

// Add Threatre Route
router.post("/add-theatre", addThreatre);

// Update Threatre Route
router.put("/update-theatre", updateThreatre);

// Get current user route
router.get("/get-all-theatres", getAllThreatre);

router.post("/get-all-theatres-by-owner", getAllThreatreByOwner);

// Delete theatre route
router.delete("/delete-theatre", deleteThreatre);

module.exports = router;
