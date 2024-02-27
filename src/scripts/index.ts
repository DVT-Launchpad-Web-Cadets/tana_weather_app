import { Map } from "leaflet";
import { getWeatherData } from "./api.ts";
import { setDOM } from "./dom.ts";
import { initilizeMap, updateMap, mapListeners } from "./map.ts";

// GLOBAL VARIABLES
const map: Map = initilizeMap();

// EVENT LISTENERSSS
window.addEventListener("load", (event) => {
  getCoords("Johannesburg");
});

// map listeners
const mapDiv: HTMLElement | null = document.getElementById("map-container");
const sevenDayDiv: HTMLElement | null =
  document.getElementById("seven-day-forecast");
const openMap: HTMLElement | null = document.getElementById("map-button-float");

if (mapDiv && sevenDayDiv && openMap) {
  mapListeners(map, mapDiv, sevenDayDiv, openMap);
}

// The user should be able to click on a major city
// to get the weather for that location
const getMajorCities: NodeListOf<HTMLElement> =
  document.querySelectorAll<HTMLElement>(".major-cities-scroll a");

const majorCities: HTMLElement[] = Array.from(getMajorCities);

for (let city of majorCities) {
  city.addEventListener("click", function (e) {
    getCoords(city.innerText);
  });
}

async function getCoords(city: string): Promise<void> {
  await fetch("../coordinates.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error! Cannot get the coordinates. Status: ${res.status}`
        );
      }
      return res.json();
    })
    .then((data) => {
      // returns the coordinates of the city
      if (
        !(
          data?.majorCities[0][city][0]?.long &&
          data?.majorCities[0][city][0]?.lat
        )
      ) {
        throw new Error("Cannot get the coordinates.");
      }
      const longitude: number = data.majorCities[0][city][0].long;
      const latitude: number = data.majorCities[0][city][0].lat;
      callTheWeatherAPI(longitude, latitude, city);
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

export function callTheWeatherAPI(
  longitude: number,
  latitude: number,
  city: string
): void {
  getWeatherData(longitude, latitude)
    .then((res) => {
      // mapping of results
      setDOM(res, city);
      updateMap(map, longitude, latitude, city);
    })
    .catch(console.error);
}
