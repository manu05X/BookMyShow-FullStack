// Add , Update , Delete and Get Movies
//

const router = require("express").Router();
//const authMiddleware = require("../middleware/authMiddleware");
const Movie = require("../models/movieModel");

// Add Movie
// we must keep the auth middeleware in these routes but as we are make a simple project just for learning we remove it
// router.post("/add-movie", authMiddleware,async (req, res) => {
//     try {
//       const newMovie = new Movie(req.body);
//       await newMovie.save();
//       console.log(newMovie);
//       res.send({
//         success: true,
//         message: "New movie has been added!",
//       });
//     } catch (err) {
//       res.send({
//         success: false,
//         message: err.message,
//       });
//     }
//   });

// Add Movie
//  As soon as the route is hit, the request.body will respond to movie model that has collection and inside this collection i am trying to add
// to add req.body and it contains the data from frontend as payload. now the express route will add it into the collection using
// await newMovie.save(); and it will add it into the collection and a successful response will be returned from the server to the client
router.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    console.log(newMovie);
    res.send({
      success: true,
      message: "New movie has been added!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Fetch the details of all the movies
router.get("/get-all-movies", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: "All movies have been fetched!",
      data: allMovies,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Fetch single movie by id
router.post("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: "Movie fetched successfully!",
      data: movie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Update a movie
router.put("/update-movie", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({
      success: true,
      message: "The movie has been updated!",
      data: movie,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Delete a movie
router.put("/delete-movie", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    console.log(req.body.movieId);
    res.send({
      success: true,
      message: "The movie has been deleted!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
