// index.js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/useRouter");
const theatreRoutes = require("./routes/theaterRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoute");

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
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

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

/*
Model -> Routes(Backend CURD API) ->  call these routes from index.js with route api -> 
  connect the frontend with the backend ("proxy": "http://localhost:8000" at the end of package.json) -> make a api module -> now use 
  asyn await to call these routes using the function name that contains the route api using event handlers present on buttons or any
  thing that capcture the evnt on frontend

*/
