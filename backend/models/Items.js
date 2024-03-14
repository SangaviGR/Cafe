const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  cafeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafe',
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a name for the item"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description for the item"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price for the item"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide a quantity for the item"],
  },
  ratings: {
    type: Number,
    required: [true, "Please provide a rating for the item"],
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
