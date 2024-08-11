const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://kmanu00005:M9zCCiFCi4DS6RL1@cluster0.uj9da.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
