const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    products:{
      type: [mongoose.Types.ObjectId],
      ref: "Product",
      required: [true, "Product required"]
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User required"]
    },
      
  },
  {
    timestamps: true,
    toObject:{
      virtuals: true
    }
  }
)


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;