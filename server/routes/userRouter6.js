/*
Jwt web Token

we need a SECRET_KEY for signature i.e generatting token that will be use to pass while generating the token.
Thts SECRET_KEY is saved in .env file. But we can't directly access .env file. So we insatll npm install dotenv-> it have a method
  process that can access the .env file.
 const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`);

 we can also use 


a api(router.get('/get-current-user')) from backend will verify if current user is a valid user or not by using the stored token/credentials on browser
so router.get('/get-current-user') will verify if current user is a valid user using the stored token/credentials if user enters any 
other components of the application

*/

const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const authMiddleware = require("./server/middleware/authMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

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
    //console.log(newUser);
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
    console.log(user);

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
    console.log(token);

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

// validate of a user using the token
//we need to write a middleware function to validate the token till the loken is valid i.e 1d or 2d or 15 minutes
// So that if we shout down the application we need not logged in again and again during the the time token is valid
// if we opened application then the token will be valid and we will log in automatically using the token store in the browser.
//we want to run our own middleware first before routes happen and users are allowed to access other page resources
router.get("/get-current-user", authMiddleware, async (req, res) => {
  // check if token is valid or not using the authMiddleware. the control has gone to the auth middleware
  //now it returns and we can check the user below using User Model from db.
  //we write query using id of current User and extract all the details except password as its a sensetive data of a user.
  const user = await User.findById(req.body.userId).select("-password");
  //console.log(user);

  //now send the data, this data can be send to frontend to redux to set the user state as redux can be access other components
  res.send({
    success: true,
    message: "User Authorzied for Protected Route",
    data: user,
  });
});

// Export the router
module.exports = router;
