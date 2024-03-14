const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the cafe"],
    unique: true,
  },
  location: {
    type: String,
    required: [true, "Please provide a location for the cafe"],
  },
  contact: {
    type: String,
    required: [true, "Please provide a contact number for the cafe"],
  },
  ratings: {
    type: Number,
    required: [true, "Please provide a rating for the cafe"],
  },
});

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = Cafe;
