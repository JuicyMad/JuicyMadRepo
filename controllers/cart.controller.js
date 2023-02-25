const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

module.exports.cart = (req, res, next) => {
  Cart.findById(req.user.cart)
  .populate('products')
  .then(cart => {
    res.render("cart/cart", {cart, products : JSON.stringify(cart.products)});
    })
    .catch(err => next(err))
};
module.exports.myCart = (req, res, next) => {
  Cart.findById(req.user.cart)
  .populate('products')
  .then(cart => {
    console.log({cart});
    res.json(cart) ;
    })
    .catch(err => next(err))
};

module.exports.editCart = (req, res, next) => {
  const productId = req.params.id || req.params.productId;
  Cart.findOneAndUpdate(
    { _id: req.user.cart },
    { $push: { products: productId } },
    { upsert: true, new: true }
  )
    .then((cartUpdated) => {
      res.json(cartUpdated.products.length)
      console.log(cartUpdated.products.length);

    })
    .catch((err) => {
      console.log(err);
    });
};
