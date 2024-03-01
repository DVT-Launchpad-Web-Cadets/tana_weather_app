import { weatherFetchRequest$, weatherResultSet$ } from "./api.ts";
import { setDOM } from "./dom.ts";
import { initilizeMap, updateMap } from "./map.ts";
import { ICityData } from "../models/cityData";
import { majorCitiesData } from "../coordinates.ts";
import { mapDisplayToggle } from "./dom.ts";

// GLOBAL VARIABLES
let currentCity = majorCitiesData[0];
const map = initilizeMap(currentCity);

// Loading current location on start up
weatherFetchRequest$.next(currentCity);

weatherResultSet$.subscribe((res) => {
  setDOM(res, currentCity.cityName);
  updateMap(map, currentCity);
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

openMap.addEventListener("click", () => mapDisplayToggle(mapDiv, sevenDayDiv));

map.on("click", onMapClick);

function onMapClick(e: { latlng: { lat: number; lng: number } }) {
  let longitude = Math.round(e.latlng.lat * 1000) / 1000;
  let latitude = Math.round(e.latlng.lng * 1000) / 1000;
  const cityData: ICityData = {
    longitude: longitude,
    latitude: latitude,
    cityName: "Selected Location",
  };
  weatherFetchRequest$.next(cityData);
  mapDiv.style.display = "none";
  sevenDayDiv.style.display = "flex";
}

// The user should be able to click on a major city
// to get the weather for that location
const getMajorCities: NodeListOf<HTMLElement> =
  document.querySelectorAll<HTMLElement>(".major-cities-scroll a");

const majorCities: HTMLElement[] = Array.from(getMajorCities);

for (const city of majorCities) {
  city.addEventListener("click", function () {
    const cityData = getCityCoords(city.innerText);

    if (Object.keys(cityData).length === 0) {
      throw new Error(`No data for ${city.innerText}`);
    }
    currentCity = cityData;
    weatherFetchRequest$.next(cityData);
  });
}

export function getCityCoords(city: string): ICityData {
  return majorCitiesData.find((cityObj) => cityObj.cityName === city)!; //asserted because it is static data
}
