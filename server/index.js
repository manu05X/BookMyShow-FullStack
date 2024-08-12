const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const connectDB = require("./config/db"); // Import the DB connection module
const userRoutes = require("./routes/userRouter");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

//telling my app to use which routes for a request
app.use("/api/users", userRoutes);

//PORT Number
const PORT = 8000;

//Continusly Listening to Port
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//https://github.com/mrinal1224/project/tree/master
