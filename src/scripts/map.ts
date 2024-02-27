import { map, latLng, marker, tileLayer, Map } from "leaflet";
import { callTheWeatherAPI } from "./index.ts";

export function updateMap(
  map,
  longitude: number,
  latitude: number,
  city: string
): void {
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

export function mapListeners(
  map: Map,
  mapDiv: HTMLElement,
  sevenDayDiv: HTMLElement,
  openMap: HTMLElement
): void {
  openMap.addEventListener("click", function (e) {
    if (mapDiv.style.display === "block") {
      mapDiv.style.display = "none";
      sevenDayDiv.style.display = "flex";
    } else {
      mapDiv.style.display = "block";
      sevenDayDiv.style.display = "none";
    }
  });

  map.on("click", onMapClick);

  function onMapClick(e) {
    let longitude = Math.round(e.latlng.lat * 1000) / 1000;
    let latitude = Math.round(e.latlng.lng * 1000) / 1000;
    callTheWeatherAPI(longitude, latitude, "Selected Location");
    mapDiv.style.display = "none";
    sevenDayDiv.style.display = "flex";
  }
}
