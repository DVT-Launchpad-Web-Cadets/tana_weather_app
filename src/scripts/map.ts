import { map as leafLetMap, latLng, marker, tileLayer, Map } from "leaflet";

export function updateMap(
  map,
  longitude: number,
  latitude: number,
  city: string
): void {
  console.log("changing map", city);

  map.panTo(latLng(latitude, longitude));
  marker(latLng(latitude, longitude)).addTo(map).openPopup();

  // use setView instead of mapto
}

export function initilizeMap(): Map {
  // initialise map and set initial view to johannesburg
  const myMap: Map = leafLetMap("map").setView([-26.204, 28.047], 13);

  tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  marker(latLng(-26.204, 28.047)).addTo(myMap).openPopup();

  return myMap;
}
