import { ICityData } from "../models/cityData";
import { IForecastRoot } from "../models/forecast";
import { IWeatherDataToStore } from "../models/weatherData";

export function storeWeather(
  city: ICityData,
  weatherDataResult: IForecastRoot
) {
  const weatherData: IWeatherDataToStore = {
    cityData: city,
    forecastData: weatherDataResult,
    expirationTime: Date.now() + 10800000, // three hours from now
  };

  const itemName: string = weatherData.cityData.cityName;
  const weatherDataString = JSON.stringify(weatherData);
  localStorage.setItem(itemName, weatherDataString);
}

export function retrieveWeather(cityName: string) {
  const storedWeatherDataString = localStorage.getItem(cityName);
  if (storedWeatherDataString) {
    const weatherData: IWeatherDataToStore = JSON.parse(
      storedWeatherDataString
    );

    if (Date.now() > weatherData.expirationTime) return "Weather Data Expired";

    return weatherData;
  }
  return "No weather found.";
}
