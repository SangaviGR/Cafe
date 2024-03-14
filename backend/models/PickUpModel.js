const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  pickupDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Ready", "Completed"],
    default: "Pending",
  },
  cafeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafe',
    required: true,
  },
  type: {
    type: String,
    enum: ["In-store Pickup", "Curbside Pickup"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Pickup = mongoose.model("Pickup", pickupSchema);

module.exports = Pickup;
