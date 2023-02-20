const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

module.exports.cart = (req, res, next) => {
  Cart.findById(req.user.cart)
  .populate('products')
    .then(cart => {
      console.log('******* ', cart);
      res.render("cart/cart", {cart});
    })
    .catch(err => next(err))
};

module.exports.editCart = (req, res, next) => {
  const productId = req.params.id;
  Cart.findOneAndUpdate(
    { _id: req.user.cart },
    { $push: { products: productId } },
    { upsert: true, new: true }
  )
    .then((cartUpdated) => {
      Product.find()
        .then((products) => {
          res.render("products/list-product", {
            products,
            currentCart: cartUpdated,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};
