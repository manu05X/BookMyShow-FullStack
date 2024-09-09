const router = require("express").Router();
const Show = require("../models/showModel");
const Theatre = require("../models/theatreModel");

//add a show

router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New show has been added!",
    });
    // console.log(req.body, res.success, res.message);
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
});

// Delete a show

router.post("/delete-show", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "The show has been deleted!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
});

// Update a show

router.put("/update-show", async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "The show has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// Get shows by Movie
//1> here we are fetching the unique theater with this below route
//Go to the DB and find the movies by the date and check for which theatre it has been scheduled and populate the data accordingly
router.post("/get-all-theatres-by-movie", async (req, res) => {
  try {
    const { movie, date } = req.body; // we are geeting this from our body i.e URL will have movie ID and the date

    //Now we find the theatre where the movie is running on specified date and return that theatre or we return empty array
    //Or if a show has been found for this date and the given movie date ,  then populate it according to the theatre
    const shows = await Show.find({ movie, date }).populate("theatre");

    let uniqueTheatres = []; // For mapping to unique theatre

    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id // At theatre collection and at show collection the id has matched so this show was scheduled for this theatre has been scheduled
      );
      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      message: "All theatres fetched!",
      data: uniqueTheatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: err.message,
    });
  }

  // let uniqueTheatres = []
});

//2> Get all shows of a wrt unique Theatres and populate them wrt movie accordingly
// Get Show by Theatres

router.post("/get-all-shows-by-theatre", async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId }).populate(
      "movie"
    );
    res.send({
      success: true,
      message: "All shows fetched",
      data: shows,
    });
    // console.log(req.body, res.data, shows)
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// new
router.post("/get-show-by-id", async (req, res) => {
  try {
    console.log("get-show-by-id");
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Show fetched!",
      data: show,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;

/*

using 1> /get-all-theatres-by-movie and 2> /get-all-shows-by-theatre 
    we are able to get all the the diffrent shows wrt to a perticular theatre uniquily . Otherwise we would have repeative theater
    name for different shows times. Example if PVR gave 3 show times i.e morning , noon and night , So it would be in a 
        linear way Say-> PVR -> morning, noon, night
        not like PVR -> morning
                 PVR -> noon
                 PVR -> night

    So this repetaion is handled using the above api to get unique theater and wrt to it all the shows

*/
