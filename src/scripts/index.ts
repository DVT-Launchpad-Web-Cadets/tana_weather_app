import { Map } from "leaflet";
import { getWeatherData, getCityCoords } from "./api.ts";
import { setDOM } from "./dom.ts";
import { initilizeMap, updateMap, mapListeners } from "./map.ts";
import { ICityData } from "../models/cityData";

// GLOBAL VARIABLES
const map: Map = initilizeMap();

// EVENT LISTENERSSS
window.addEventListener("load", (event) => {
  getCityCoords("Johannesburg");
});

// map listeners
const mapDiv = document.getElementById("map-container") as HTMLElement;
const sevenDayDiv = document.getElementById(
  "seven-day-forecast"
) as HTMLElement;
const openMap = document.getElementById("map-button-float") as HTMLElement;

if (!(mapDiv || sevenDayDiv || openMap)) {
  throw new Error("Cannot find the map, or the 7 day forecast div");
}
mapListeners(map, mapDiv, sevenDayDiv, openMap);

// The user should be able to click on a major city
// to get the weather for that location
const getMajorCities: NodeListOf<HTMLElement> =
  document.querySelectorAll<HTMLElement>(".major-cities-scroll a");

const majorCities: HTMLElement[] = Array.from(getMajorCities);

for (const city of majorCities) {
  city.addEventListener("click", function (e) {
    getCityCoords(city.innerText);
  });
}

export function callTheWeatherAPI(cityData: ICityData): void {
  getWeatherData(cityData.longitude, cityData.latitude)
    .then((res) => {
      // mapping of results
      setDOM(res, cityData.city);
      updateMap(map, cityData);
    })
    .catch(console.error);
}
