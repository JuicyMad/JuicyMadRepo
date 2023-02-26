
const Cart = require("../models/Cart.model");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");

module.exports.newOrder = (req, res, next) => {
  Cart.findById(req.user.cart)
    .then((cart) => {
      return Order.create({
        products: cart.products,
        user: req.user.id,
      }).then((result) => {
        Cart.findByIdAndUpdate(
          req.user.cart,
          { products: [] },
          { new: true }
        ).then((UpdatedCart) => {
          res.redirect("/me/order");
        });
      });
    })
    .catch(next);
};

module.exports.findOrder = (req, res, next) => {
  Order.findById(req.user.order)
    .then((order) => {
      res.render("order/detail", { order });
    })
    .catch((err) => next(err));
};

module.exports.listOrders = (req, res, next) => {
  Order.find({ user: req.user.id })
    .then((userOrders) => {
      console.log('-------> ', userOrders);
      res.render("order/my-orders", { userOrders });
    })
    .catch((err) => console.log(err));
};
