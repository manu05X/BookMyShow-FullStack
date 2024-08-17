//need mongoose to save our schema
// we create schema
const mongoose = require("mongoose");

const theatreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }, // to discuss later
  isActive: {
    type: Boolean,
    default: false,
  },
});

//3> model -> convert the schema to theatre object
const Theatre = mongoose.model("theatres", theatreSchema);

module.exports = Theatre;
