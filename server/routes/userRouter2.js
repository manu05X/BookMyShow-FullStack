/*

Putting a check on email from user model on email if it is not already present
 const userExists = await User.findOne({ email: req.body.email });
 if (userExists) {
      res.send({
        success: true,
        message: "User already exists",
      });
    }

    findOne returns a boolean value indicating whether the user is already present in the database.
    if it is not then create a new user else return user already present or registered.
*/

const express = require("express");

//const router = require('router'); // OR
const router = express.Router();

//getting models as we do all CURD operation on models
const User = require("../models/userModel");

//route for Register

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email }); // fi

    //if user exists then return user already registered else create new user
    if (userExists) {
      res.send({
        success: true,
        message: "User already exists",
      });
    }

    // new user created as req body properties are passed to model for user constructor and then saving it into Database
    const newUser = await User(req.body);
    await newUser.save(); //take all properties from req.body and save them into db

    res.send({
      success: true,
      message: "User Successfully registered",
    });
  } catch (err) {
    console.log(err);
  }
});

// Export the router
module.exports = router;
