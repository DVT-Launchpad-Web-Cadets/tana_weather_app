import { map, latLng, marker, tileLayer, Map } from "leaflet";
import { callTheWeatherAPI } from "./index.ts";

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
  const myMap: Map = map("map").setView([-26.204, 28.047], 13);

  tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  marker(latLng(-26.204, 28.047)).addTo(myMap).openPopup();

  return myMap;
}

export function map_listeners(
  map: Map,
  map_div: HTMLElement,
  seven_day: HTMLElement,
  open_map: HTMLElement
): void {
  open_map.addEventListener("click", function (e) {
    if (map_div.style.display === "block") {
      map_div.style.display = "none";
      seven_day.style.display = "flex";
    } else {
      map_div.style.display = "block";
      seven_day.style.display = "none";
    }
  });

  map.on("click", onMapClick);

  function onMapClick(e) {
    let longitude = Math.round(e.latlng.lat * 1000) / 1000;
    let latitude = Math.round(e.latlng.lng * 1000) / 1000;
    // console.log(longitude);
    // console.log(latitude);
    // console.log(location);
    callTheWeatherAPI(longitude, latitude, "Selected Location");
    map_div.style.display = "none";
    seven_day.style.display = "flex";
  }
}
