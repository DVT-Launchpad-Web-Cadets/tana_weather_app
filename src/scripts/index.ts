import { weatherFetchRequest$, weatherResultSet$ } from "./api.ts";
import { setDOM } from "./dom.ts";
import { initilizeMap, updateMap, mapListeners } from "./map.ts";
import { ICityData } from "../models/cityData";
import { majorCitiesData } from "../coordinates.ts";

// GLOBAL VARIABLES
let currentCity = majorCitiesData[0];
console.log("Current city: ", currentCity.cityName);

const map = initilizeMap(currentCity);

// Loading current location on start up
weatherFetchRequest$.next(currentCity);
subscribeToWeatherAPI(currentCity);

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
  city.addEventListener("click", function () {
    console.log("this is running");
    const cityData = getCityCoords(city.innerText);

    if (Object.keys(cityData).length === 0) {
      throw new Error(`No data for ${city.innerText}`);
    }
    weatherFetchRequest$.next(cityData);
    subscribeToWeatherAPI(cityData);
    // weatherObservable$.unsubscribe();
  });
}

export function getCityCoords(city: string): ICityData {
  for (const majorCity of majorCitiesData) {
    if (majorCity.cityName === city) {
      console.log(majorCity.cityName);
      return majorCity;
    }
  }
  return {} as ICityData;
}

export function subscribeToWeatherAPI(cityData: ICityData): void {
  // console.log("hello 2");

  // weatherFetchRequest$.next(cityData);

  // console.log("hello 3");
  console.log("in the subscribe to weather api function");

  weatherResultSet$.subscribe((res) => {
    console.log("subscribed");
    console.log(res);
    setDOM(res, cityData.cityName);
    updateMap(map, cityData);
  });

  // console.log("hello 4");
}

// export function callTheWeatherAPI(cityData: ICityData): void {
//   getWeatherData(cityData.longitude, cityData.latitude)
//     .then((res) => {
//       // mapping of results
//       setDOM(res, cityData.city);
//       updateMap(map, cityData);
//     })
//     .catch(console.error);
// }
