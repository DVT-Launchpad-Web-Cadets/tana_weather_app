import { Map } from "leaflet";
import { getWeatherData } from "./api.ts";
import { setDOM } from "./dom.ts";
import { initilizeMap, updateMap, map_listeners } from "./map.ts";

// GLOBAL VARIABLES
const map: Map = initilizeMap();

// EVENT LISTENERSSS
window.addEventListener("load", (event) => {
  getCoords("Johannesburg");
});

// map listeners
const map_div: HTMLElement | null = document.getElementById("map_container");
const seven_day: HTMLElement | null =
  document.getElementById("seven_day_forecast");
const open_map: HTMLElement | null =
  document.getElementById("map_button_float");

if (map_div && seven_day && open_map) {
  map_listeners(map, map_div, seven_day, open_map);
}

// The user should be able to click on a major city
// to get the weather for that location
const getMajorCities: NodeListOf<HTMLElement> =
  document.querySelectorAll<HTMLElement>(".major_cities_scroll a");

const majorCities: HTMLElement[] = Array.from(getMajorCities);

for (let city of majorCities) {
  city.addEventListener("click", function (e) {
    console.log(city.innerText);
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
      const longitude: number = data.major_cities[0][city][0].long;
      const latitude: number = data.major_cities[0][city][0].lat;
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
      console.log(res);
      console.log("---");
      setDOM(res, city);
      updateMap(map, longitude, latitude, city);
    })
    .catch(console.error)
    .finally(() => {
      // cleanup
    });
}
