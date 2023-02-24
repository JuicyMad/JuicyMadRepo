const Order = require("../models/Order.model");
const Product = require("../models/Product.model");

module.exports.newOrder = (req, res, next) => {
  console.log("AQUII");
  Order.insertMany([
    {
      products: req.body.products,
      user: req.user,
      status: "Order accepted",
    },
  ]).then(() => {
    res.json();
  });
};
