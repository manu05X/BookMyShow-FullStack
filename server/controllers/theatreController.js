//

const Theatre = require("../models/theatreModel");

//1> Add new Threat
/*

exports.addThreatre = async (req, res) => {:
    This function is an asynchronous function that handles the addition of a new theatre.
    It uses the req (request) and res (response) objects from Express.js.
    The function is exported so it can be used in other parts of the application.

const newThreatre = new Theatre(req.body);:
    A new instance of the Theatre model is created using the data from the request body (req.body).
    This data represents the theatre details (e.g., name, location) that need to be saved.


await newThreatre.save();:
    The new theatre is saved to the MongoDB database using the save method.
    The await keyword ensures that the function waits until the save operation is complete.

res.send({ success: true, message: "New Threat has been added!" });:
    If the save operation is successful, a success message is sent back to the client.

catch (err) {:
    If an error occurs during the save operation, it is caught and an error message is sent to the client.

*/
exports.addThreatre = async (req, res) => {
  try {
    const newThreatre = new Theatre(req.body);
    await newThreatre.save();

    res.send({
      success: true,
      message: "New Threat has been added!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

//2> Update the threat model
/*

exports.updateThreatre = async (req, res) => {:
    This function handles the updating of an existing theatre's details.

await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);:
    The findByIdAndUpdate method is used to find a theatre by its ID (req.body.theatreId) and update it with the new data provided in the request body (req.body).

res.send({ success: true, message: "Threatre has been updated" });:
    If the update is successful, a success message is sent back to the client.

*/
exports.updateThreatre = async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);

    res.send({
      success: true,
      message: "Threatre has been updated",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

//Get all the threatre Admin route
/*

exports.getAllThreatre = async (req, res) => {:
    This function retrieves all theatres from the database, intended for administrative purposes.

const allThreats = await Theatre.find().populate("owner");:
    The find method retrieves all theatre documents from the Theatre collection.
    The populate("owner") method populates the owner field in the theatre documents with the corresponding data from the related collection (e.g., User).

res.send({ success: true, message: "All theatres fetched successfully!", data: allThreats });:
    A success message along with the retrieved theatre data is sent back to the client.

*/
exports.getAllThreatre = async (req, res) => {
  try {
    //goes into theater collection and find it based on populate method that expect a key based on which it find theater owner
    const allThreats = await Theatre.find().populate("owner");
    //console.log(allThreats);
    res.send({
      success: true,
      message: "All theatres fetched successfully!",
      data: allThreats,
    });
  } catch (error) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

//Get the threatre of a specific owner
/*

exports.getAllThreatreByOwner = async (req, res) => {:
    This function retrieves theatres associated with a specific owner.

const allThreats = await Theatre.find({ owner: req.body.owner });:
    The find method is used with a filter to retrieve only those theatres that belong to a specific owner (req.body.owner).

res.send({ success: true, message: "All theatres fetched successfully!", data: allThreats });:
    A success message along with the retrieved theatre data is sent back to the client.

*/
exports.getAllThreatreByOwner = async (req, res) => {
  try {
    const allThreats = await Theatre.find({ owner: req.body.owner });

    res.send({
      success: true,
      message: "All theatres fetched successfully!",
      data: allThreats,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// Delete the threatre of a specific
/*

exports.deleteThreatre = async (req, res) => {:
    This function handles the deletion of a specific theatre from the database.

await Theatre.findByIdAndDelete(req.body.theatreId);:
    The findByIdAndDelete method is used to find a theatre by its ID (req.body.theatreId) and delete it from the database.

res.send({ success: true, message: "Threatre has been deleted!" });:
    If the deletion is successful, a success message is sent back to the client.

*/
exports.deleteThreatre = async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);

    res.send({
      success: false,
      message: "Threatre has been deleted!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

/*

Async/Await: The functions use async/await for handling asynchronous operations (like database queries) to ensure smooth execution and better error handling.
Try/Catch: Each function is wrapped in a try/catch block to handle potential errors and send appropriate responses.
Mongoose: Mongoose is used to interact with the MongoDB database. Methods like findByIdAndUpdate, find, and findByIdAndDelete are Mongoose methods that simplify these operations.


addThreatre: Adds a new theatre to the database.
updateThreatre: Updates an existing theatre's details.
getAllThreatre: Retrieves all theatres (admin route).
getAllThreatreByOwner: Retrieves theatres associated with a specific owner.
deleteThreatre: Deletes a specific theatre by its ID.

*/
