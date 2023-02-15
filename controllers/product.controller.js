const Product = require("../models/Product.model");

module.exports.list = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("products/list", { products });
    })
    .catch((err) => console.log(err));
};

module.exports.detail = () => {};

module.exports.create = (req, res, next) => {
  res.render("products/create-form");
};

module.exports.doCreate = (req, res, next) => {
  Product.create(req.body)
    .then((product) => {
      res.redirect("/products");
    })
    .catch((err) => console.err(err));
};

module.exports.update = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.render("products/update-form", { product });
      } else {
        res.redirect("/products");
      }
    })
    .catch(() => res.redirect("/products"));
};

module.exports.doUpdate = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => console.err(err));
};

module.exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/products");
    });
};
