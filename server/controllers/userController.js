// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User successfully registered",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error registering user",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not registered. Please register first.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error logging in user",
    });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "User authorized for protected route",
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error retrieving user data",
    });
  }
};
