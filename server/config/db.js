// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kmanu00005:M9zCCiFCi4DS6RL1@cluster0.uj9da.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Db connection established");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
