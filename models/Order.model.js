const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User required"]
    },
    products:{
      type: [mongoose.Types.ObjectId],
      ref: "Product",
      required: [true, "Product required"]
    },
    status: {
      type: String,
      enum: ["Order accepted","In process", "On the way", "Delivered"],
      default: "Order accepted"
    },
  },
  {
    timestamps: true,
    toObject:{
      virtuals: true
    }
    
  }
)

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;