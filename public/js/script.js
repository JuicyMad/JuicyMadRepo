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


const addCartBtns = document.querySelectorAll(".cart-btn");
Array.from(addCartBtns).forEach((button) => {
  button.addEventListener("click", function (event) {
    if (addCartBtns) {
    }
  });
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      mapboxgl.accessToken =
        "pk.eyJ1IjoiY2RlbGF0b3JyZSIsImEiOiJja3Y5bHJ6ZzcweG0yMnZtZzI4eXJna2UxIn0.m-OWQWPhRrb5ZNRz0M9AqQ";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [center.lng, center.lat],
        zoom: 18,
      });

      const marker2 = new mapboxgl.Marker({ color: "green" })
        .setLngLat([center.lng, center.lat])
        .addTo(map);
    },
    function () {
      console.log("Error in the geolocation service.");
    }
  );
}
