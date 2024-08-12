/*

1> require express 
2> require router
3> As we do all CURD operation on models, so we need models
4>

*/

const express = require("express");

//const router = require('router'); // OR
const router = express.Router();

//getting models as we do all CURD operation on models
const User = require("../models/userModel");

//route for Register

router.post("/register", async (req, res) => {
  const newUser = await User(req.body);
  await newUser.save(); //take all properties from req.body and save them into db

  res.send({
    success: true,
    message: "User Successfully registered",
  });
});

// Export the router
module.exports = router;
