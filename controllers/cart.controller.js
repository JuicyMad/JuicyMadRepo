const Cart = require("../models/cart.model");

module.exports.cart = (req, res, next) => {
  res.render("cart/cart");
};

module.exports.editCart = (req, res, next) => {
  const productId = req.params.id;
  Cart.updateOne(
    { _id: req.user.cart },
    { $push: { products: productId }, new: true }
  )
    .then((cartUpdated) => {
      console.log(cartUpdated);
      res.send(cartUpdated.lenght);
    })
    .catch((err) => console.log(err));
};
