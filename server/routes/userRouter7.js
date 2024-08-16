const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// Register route
router.post("/register", async (req, res) => {
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // Encrypt the user's password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    // Save the new user to the database
    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User successfully registered",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error registering user",
    });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    //console.log("Login Started");
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    //console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not registered. Please register first.",
      });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    //console.log("isMatch", isMatch);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "1d",
    });
    //console.log("Token", token);

    res.send({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error logging in user",
      error: err.message,
    });
  }
});

// Get current user route
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    // Retrieve the user's details except for the password
    const user = await User.findById(req.body.userId).select("-password");

    res.send({
      success: true,
      message: "User authorized for protected route",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error retrieving user data",
    });
  }
});

module.exports = router;
