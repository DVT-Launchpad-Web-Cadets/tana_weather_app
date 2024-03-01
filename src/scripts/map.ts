import { map as createMap, latLng, marker, tileLayer, Map } from "leaflet";
import { ICityData } from "../models/cityData";

export function updateMap(map: Map, cityData: ICityData): void {
  map.panTo(latLng(cityData.latitude, cityData.longitude));
  marker(latLng(cityData.latitude, cityData.longitude)).addTo(map).openPopup();

  // use setView (or flyTo - has cool animations) instead of mapto
}

let myMap: Map;

export function initilizeMap(currentCity: ICityData): Map {
  // initialise map and set initial view to johannesburg
  myMap = createMap("map", {
    center: [currentCity.latitude, currentCity.longitude],
    zoom: 13,
  });

  tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  marker(latLng(currentCity.latitude, currentCity.longitude))
    .addTo(myMap)
    .openPopup();
  return myMap;
}
