import { IForecastRoot } from "../models/forecast";
import { ICityData } from "../models/cityData.js";
import { callTheWeatherAPI } from "./index.js";

export function getWeatherData(
  longitude: number,
  latitude: number
): Promise<IForecastRoot> {
  return fetch(
    `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`
  ).then((response) => response.json());
}

export async function getCityCoords(city: string): Promise<void> {
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
      const cityData: ICityData = {
        longitude: longitude,
        latitude: latitude,
        city: city,
      };
      callTheWeatherAPI(cityData);
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
