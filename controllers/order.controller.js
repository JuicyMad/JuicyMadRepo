const Cart = require("../models/Cart.model");
const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const getDistinctProductsWithCount = require("../public/js/get-distinct-products-with-count")

module.exports.newOrder = (req, res, next) => {
  Cart.findById(req.user.cart)
    .then((cart) => {
      if(cart.products.length){
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
        
      } else{
        res.status(400).redirect("/home")
      }
    })
    .catch(next);
};

module.exports.findOrder = (req, res, next) => {
  Order.findById(req.user.order)
    .then((order) => {
      res.render("order/order", { order });
    })
    .catch((err) => next(err));
};

module.exports.listOrders = (req, res, next) => {
  Order.find({ user: req.user.id })
    .populate("products")
    .then((userOrders) => {
      const orders = userOrders.map((order) => {
        const products = order.products;
        order.distinctProducts = getDistinctProductsWithCount(products)
       
        return order;
      });
      console.log({ orders });
      res.render("order/my-orders", { userOrders: orders });
    })
    .catch((err) => console.log(err));
};


