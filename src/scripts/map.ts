import { map as createMap, latLng, marker, tileLayer, Map } from "leaflet";
import { fromEvent } from "rxjs";
import { subscribeToWeatherAPI } from "./index.ts";
import { ICityData } from "../models/cityData";
import { mapDisplayToggle } from "./dom.ts";

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

  // myMap.setView([currentCity.latitude, currentCity.longitude], 13);

  tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  marker(latLng(currentCity.latitude, currentCity.longitude))
    .addTo(myMap)
    .openPopup();

  console.log("Map is initialised.");
  return myMap;
}

export function mapListeners(
  map: Map,
  mapDiv: HTMLElement,
  sevenDayDiv: HTMLElement,
  openMap: HTMLElement
): void {
  // openMap.addEventListener("click", () =>
  //   mapDisplayToggle(mapDiv, sevenDayDiv)
  // );

  const mapButton$ = fromEvent(openMap, "click");
  mapButton$.subscribe(() => {
    mapDisplayToggle(mapDiv, sevenDayDiv);
  });

  map.on("click", onMapClick);

  function onMapClick(e: any) {
    let longitude = Math.round(e.latlng.lat * 1000) / 1000;
    let latitude = Math.round(e.latlng.lng * 1000) / 1000;
    const cityData: ICityData = {
      longitude: longitude,
      latitude: latitude,
      cityName: "Selected Location",
    };
    subscribeToWeatherAPI(cityData);
    mapDiv.style.display = "none";
    sevenDayDiv.style.display = "flex";
  }
}
