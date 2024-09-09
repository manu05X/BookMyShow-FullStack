/*
1> need mongoose
2> user schema
3> model
4> export model
*/

//1>
const mongoose = require("mongoose");
//2>
const showSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Array,
      default: [],
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatres",
      required: true,
    },
  },
  { timestamps: true }
);

//3> create the model of shows using showSchema
const Show = mongoose.model("shows", showSchema);
//4> export the model
module.exports = Show;
/*

we need movie id for which we want to create the show and in which theatre so we need to have theatre id.

 movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatres",
      required: true,
    },

*/