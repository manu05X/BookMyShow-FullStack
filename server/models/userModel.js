/*
1> need mongoose
2> user schema
3> model
4> export model
*/

//1> need mongoose
const mongoose = require("mongoose");

//2> user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    //   role: {
    //     type: String,
    //     enum: ["admin", "user", "partner"],
    //     required: true,
    //     default: "user",
    //   },
  },
  { timestamps: true }
);

//3> model -> convert the schema to users object
const User = mongoose.model("users", userSchema);

//4> export the model
module.exports = User;
