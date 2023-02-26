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
        zoom: 12,
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
