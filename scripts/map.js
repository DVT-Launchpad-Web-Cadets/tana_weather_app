export function updateMap(map, longitude, latitude, city) {
  console.log("changing map", city);

  map.panTo(new L.LatLng(latitude, longitude));

  //   L.marker([latitude, longitude]).addTo(map).openPopup();
}

export function initilizeMap() {
  // initialise map and set initial view to johannesburg
  const map = L.map("map").setView([-26.204, 28.047], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
}
