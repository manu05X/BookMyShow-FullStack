// index.js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/useRouter");
const theatreRoutes = require("./routes/theaterRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/theatre", theatreRoutes);
app.use("/api/movies", movieRoutes);

// Define the port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
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

*/

//https://github.com/mrinal1224/project/tree/master
