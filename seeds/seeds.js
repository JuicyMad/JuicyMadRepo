const mongoose = require("mongoose");
const Product = require("../models/Product.model");

require("../config/db.config");

const products = require("../poducts.json");

mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );

  mongoose.connection.db
    .dropDatabase()
    .then(() => {
      console.info("Db.config has been cleared");

      return Product.create(products);
    })
    .then((createdProducts) => {
      createdProducts.forEach((product) => {
        console.log(`Product with name ${product.name} has been created`);
      });
      console.log(
        `A total of ${createdProducts.length} products has been created`
      );
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.connection.close(function () {
        console.log("Mongoose disconnected");
        process.exit(0);
      });
    });
});