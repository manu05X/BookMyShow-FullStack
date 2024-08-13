/*
Jwt web Token

we need a SECRET_KEY for signature i.e generatting token that will be use to pass while generating the token.
Thts SECRET_KEY is saved in .env file. But we can't directly access .env file. So we insatll npm install dotenv-> it have a method
  process that can access the .env file.
 const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`);

 we can also use 

*/

const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.send({
        success: false,
        message: "User already exists",
      });
    }

    //Generating salt for encrypting password
    const salt = await bcrypt.genSalt(10);
    //console.log(salt); //Generating salt for encrypting password in cli

    //Mixing the salt with my password i.e we are encrypting the password
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Assigning the hash password to request body and then save it in DB as new User
    req.body.password = hashPassword;

    const newUser = await User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User Successfully registered",
    });
  } catch (err) {
    console.log(err);
  }
});

//Login routes
router.post("/login", async (req, res) => {
  try {
    //gettin user, password from request body input by user
    const { email, password } = req.body;
    // Find the user by email from User model in the database
    const user = await User.findOne({ email }); // it will return the user object previously present in the database
    //console.log(user);

    //check if user is present or not
    if (!user) {
      //return res.status(404).send({
      return res.send({
        success: false,
        message: "You are not registered. Please register first.",
      });
    }

    //now validate password by comparing req body pass and user model database pass that was saved during registration
    const isMatch = await bcrypt.compare(password, user.password); //returns a boolean value
    //console.log("validate password -> " + isMatch);

    if (!isMatch) {
      //   return res.status(400).send({
      return res.send({
        success: false,
        message: "Invalid credentials",
      });
    }

    //Now if we reach here then password is correct now we generate JWT token
    // so as id is present in mongodb and its saved as _id so we can access it from the above user that we already have from User model
    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      user: user,
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
});

// Export the router
module.exports = router;
