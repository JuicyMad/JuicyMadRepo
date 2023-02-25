window.onload = () => {
  const addCartBtns = document.querySelectorAll(".cart-btn");
  addCartBtns.forEach((button) => {
    button.addEventListener("click", function (event) {
      const productId = this.getAttribute("data-productid");
      axios
        .put(`/cart/products/${productId}`)
        .then((numsproducts) => {
          const cartProductCount = numsproducts.data;
          setCartProductCount(cartProductCount);
        })
        .catch((err) => console.log(err));
    });
  });

  axios.get("/me/cart").then((cart) => {
    const cartProductCount = cart.data?.products?.length ?? 0;
    setCartProductCount(cartProductCount);
  });
};

function setCartProductCount(count) {
  const cartProductCount = document.querySelector("#cart-product-count");
  if (!cartProductCount) {
    return;
  }
  cartProductCount.innerHTML = count;
}
