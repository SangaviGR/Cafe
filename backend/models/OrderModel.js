const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  type: {
    type: String,
    enum: ["Takeaway", "Delivery"],
    required: true,
  },
  dineIn: {
    type: Boolean,
    default: false,
  },
  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  totalCost: {
    type: Number,
    default: 0,
  },
});

orderSchema.pre('save', async function (next) {
  let totalCost = 0;
  for (const item of this.items) {
    if (!item.price) {
      const itemDoc = await mongoose.model('Item').findById(item.itemId);
      if (itemDoc) {
        item.price = itemDoc.price;
      }
    }
    totalCost += item.price || 0; // Use 0 as default if price is not set
  }
  this.totalCost = totalCost;
  next();
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
