/*

Encryptying password using bcrypt
 Generating salt for encrypting password using bcrypt library
    const salt = await bcrypt.genSalt(10);
    10 stands for no of times the random string will be manupulated


Login routes
1> get the email and password from the request body object that client/user is trying to login
2> Find the email using findOne from User model from Db
3> Check if the user is present in our db or not. If not then tell them to register
4> if user exists then chek if password is correct or not. Using bcrypt library compare method for comparing passwords given
    by user now and the password already stored in the database.

    How compare works in Bcrypt library?
    Answer: It first takes out the SALT from the previous saved password in DB, then mix the salt into current provided password.
            Then compare the both string  and check if its same or not.
*/

const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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

    //Now if we reach here then password is correct now login success

    res.send({
      success: true,
      message: "User logged in successfully",
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
