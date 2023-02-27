function getDistinctProductsWithCount(products){
  return products.reduce(
     (distinctProducts, currentProduct) => {
       if (!distinctProducts[currentProduct._id]) {
         distinctProducts[currentProduct._id] = {
           _id: currentProduct._id,
           name: currentProduct.name,
           count: 1,
         };
         return distinctProducts;
       }
       const repetedProduct = distinctProducts[currentProduct._id];
       distinctProducts[currentProduct._id] = {
         _id: repetedProduct._id,
         name: repetedProduct.name,
         count: repetedProduct.count + 1,
       };
       return distinctProducts;
     },
     {}
   );
 }
 module.exports = getDistinctProductsWithCount