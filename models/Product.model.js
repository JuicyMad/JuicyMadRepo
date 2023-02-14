const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Smoothies", "Salads", "Toasts"],
    default: "Smoothies",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  propierties: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  img: {
    type: String,
    default: "URL",
  },
  slug: {
    type: String,
    default: "URL",
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
