import { IForecastRoot, ISeries } from "../models/forecast";
import { monthNames, dayNames } from "../monthAndDateNames";

export function setDOM(results: IForecastRoot, cityName: string): void {
  if (!(results?.dataseries && results?.dataseries[0])) {
    throw new Error("No weather results found.");
  }
  setTodayElement(results.dataseries[0], cityName);
  set7dayForecast(results.dataseries);
}

function setTodayElement(todaysWeatherData: ISeries, cityName: string): void {
  if (
    !(
      todaysWeatherData?.date &&
      todaysWeatherData?.temp2m?.min &&
      todaysWeatherData?.temp2m?.max &&
      todaysWeatherData?.weather
    )
  ) {
    throw new Error("Today's weather data is not found.");
  }

  // todays date
  const todaysDate: Date = getDate(todaysWeatherData.date.toString());
  const dateString: string = `${
    dayNames[todaysDate.getDay()]
  }, ${todaysDate.getDate()} ${
    monthNames[todaysDate.getMonth()]
  } ${todaysDate.getFullYear()}`;

  const todayElement = document.getElementById("todays-date");
  // location name
  const locationName = document.getElementById("location-name");
  // tempRanges
  const tempRanges = document.getElementById("temp-ranges");
  // weather description
  const weather = document.getElementById("weather-descr");
  // weather icon
  const icon = document.getElementById("weather-icon");

  if (!(todayElement && locationName && tempRanges && weather && icon)) {
    throw new Error("Todays weather DOM elements are not available.");
  }

  todayElement.innerText = dateString;
  locationName.innerText = cityName;
  tempRanges.innerText = getTempRangesString(
    todaysWeatherData.temp2m.min,
    todaysWeatherData.temp2m.max
  );
  const weatherDescription: string = getWeatherDescription(
    todaysWeatherData.weather
  );
  weather.innerText = weatherDescription;
  icon.setAttribute("src", getIconSrc(todaysWeatherData.weather));
}

function getDate(dateString: string): Date {
  const year = Number(dateString.substring(0, 4));
  const month = Number(dateString.substring(4, 6)) - 1;
  const day = Number(dateString.substring(6, 8));
  return new Date(year, month, day);
}

function getWeatherDescription(weather: string): string {
  if (!weather) return "";

  switch (weather) {
    case "clear":
      return "Clear";
    case "cloudy":
      return "Overcast";
    case "lightrain":
      return "Light rain";
    case "pcloudy":
      return "Partly cloudy";
    case "ts":
      return "Isolated thunderstorms";
    case "snow":
      return "Snow";
    case "rain":
      return "Rain";
    case "tsrain":
      return "Thunderstorm";
    case "mcloudy":
      return "Cloudy";
    case "humid":
      return "Foggy";
    case "oshower":
      return "Occasional showers";
    case "ishower":
      return "Isolated showers";
    case "lightsnow":
      return "Light snow";
    case "rainsnow":
      return "Ice pellets/Freezing rain";
    default:
      return "Windy";
  }
}

function getTempRangesString(minTemp: number, maxTemp: number): string {
  return `${minTemp}\xB0C ~ ${maxTemp}\xB0C`;
}

function set7dayForecast(forecastData: ISeries[]): void {
  const sevenDayForecast: HTMLElement | null =
    document.getElementById("seven-day-forecast");
  if (!sevenDayForecast) {
    throw new Error("Could not find where to place the 7-day forecast.");
  }

  sevenDayForecast.innerHTML = "";
  for (const day of forecastData) {
    const forecastElement: HTMLDivElement = setDay(day);
    sevenDayForecast.appendChild(forecastElement);
  }
}

function setDay(daysData: ISeries): HTMLDivElement {
  if (
    !(
      daysData?.date &&
      daysData?.temp2m &&
      daysData?.temp2m &&
      daysData?.weather
    )
  ) {
    throw new Error("Today's weather data is not found.");
  }

  const forecastItem = document.createElement("div");
  forecastItem.className = "forecast-item";

  // day
  const dayDate = getDate(daysData.date.toString());
  const day = dayNames[dayDate.getDay()];

  const forecastDay = document.createElement("div");
  forecastDay.className = "forecast-day";
  forecastDay.innerText = day;
  forecastItem.appendChild(forecastDay);

  // icon
  const forecastIcon = document.createElement("img");
  forecastIcon.className = "forecast-icon";
  forecastIcon.src = getIconSrc(daysData.weather);
  forecastItem.appendChild(forecastIcon);

  // temp ranges
  const tempRanges = getTempRangesString(
    daysData.temp2m.min,
    daysData.temp2m.max
  );
  const forecastTempRanges = document.createElement("div");
  forecastTempRanges.className = "forecast-temp-ranges";
  forecastTempRanges.innerText = tempRanges;
  forecastItem.appendChild(forecastTempRanges);

  //description
  const weatherDescription = getWeatherDescription(daysData.weather);

  const forecastDescription = document.createElement("div");
  forecastDescription.className = "forecast-descr";
  forecastDescription.innerText = weatherDescription;
  forecastItem.appendChild(forecastDescription);

  return forecastItem;
}

export function mapDisplayToggle(
  mapDiv: HTMLElement,
  sevenDayDiv: HTMLElement
) {
  if (mapDiv.style.display === "block") {
    mapDiv.style.display = "none";
    sevenDayDiv.style.display = "flex";
  } else {
    mapDiv.style.display = "block";
    sevenDayDiv.style.display = "none";
  }
}

function getIconSrc(weather: string): string {
  if (!weather) return "";

  switch (weather) {
    case "clear":
      return "icons/clear.png";
    case "cloudy":
      return "icons/overcast.png";
    case "lightrain":
      return "icons/raining.png";
    case "pcloudy":
      return "icons/pcloudy.png";
    case "ts":
      return "icons/storm.png";
    case "snow":
      return "icons/snow.png";
    case "rain":
      return "icons/raining.png";
    case "tsrain":
      return "icons/storm.png";
    case "mcloudy":
      return "icons/pcloudy.png";
    case "humid":
      return "icons/fog.png";
    case "oshower":
      return "icons/raining.png";
    case "ishower":
      return "icons/raining.png";
    case "lightsnow":
      return "icons/snow.png";
    case "rainsnow":
      return "icons/snow.png";
    default:
      return "icons/wind.png";
  }
}
