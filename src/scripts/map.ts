import { map, latLng, marker, tileLayer, Map } from "leaflet";
import { callTheWeatherAPI } from "./index.ts";
import { ICityData } from "../models/cityData";
import { mapDisplayToggle } from "./dom.ts";

export function updateMap(map, cityData: ICityData): void {
  map.panTo(latLng(cityData.latitude, cityData.longitude));
  marker(latLng(cityData.latitude, cityData.longitude)).addTo(map).openPopup();

  // use setView (or flyTo - has cool animations) instead of mapto
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
  openMap.addEventListener("click", () =>
    mapDisplayToggle(mapDiv, sevenDayDiv)
  );

  map.on("click", onMapClick);

  function onMapClick(e) {
    let longitude = Math.round(e.latlng.lat * 1000) / 1000;
    let latitude = Math.round(e.latlng.lng * 1000) / 1000;
    const cityData: ICityData = {
      longitude: longitude,
      latitude: latitude,
      city: "Selected Location",
    };
    callTheWeatherAPI(cityData);
    mapDiv.style.display = "none";
    sevenDayDiv.style.display = "flex";
  }
}
