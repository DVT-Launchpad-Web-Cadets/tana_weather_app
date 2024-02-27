import { ForecastRoot, Series } from "../models/forecast";

export function setDOM(results: ForecastRoot, city: string): void {
  // console.log(results.dataseries[0].date);
  // console.log(results.dataseries[0].temp2m.max);
  // console.log(results.dataseries[0].temp2m.min);
  // console.log(results.dataseries[0].weather);

  setTodayElement(results.dataseries[0], city);

  console.log(results.dataseries);
  set7dayForecast(results.dataseries);
}

function setTodayElement(todays_data: Series, city: string): void {
  // todays date
  const todays_date: Date = getDate(todays_data.date.toString());
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const datestring: string = `${getDayOfWeek(
    todays_date.getDay()
  )}, ${todays_date.getDate()} ${
    monthNames[todays_date.getMonth()]
  } ${todays_date.getFullYear()}`;

  const todayElement: HTMLElement | null =
    document.getElementById("todaysdate");
  // location name
  const location: HTMLElement | null = document.getElementById("location_name");
  // temp_ranges
  const temp_ranges: HTMLElement | null =
    document.getElementById("temp_ranges");
  // weather description
  const weather: HTMLElement | null = document.getElementById("weather_descr");
  // weather icon
  const icon: HTMLElement | null = document.getElementById("weather_icon");

  if (todayElement && location && temp_ranges && weather && icon) {
    todayElement.innerText = datestring;
    location.innerText = city;
    temp_ranges.innerText = getTempRangesString(
      todays_data.temp2m.min,
      todays_data.temp2m.max
    );
    const weatherdescription: string = getWeatherDescription(
      todays_data.weather
    );
    weather.innerText = weatherdescription;
    icon.setAttribute("src", getIconSrc(todays_data.weather));
  }
}

function getDate(datestring: string): Date {
  const year = Number(datestring.substring(0, 4));
  const month = Number(datestring.substring(4, 6)) - 1;
  const day = Number(datestring.substring(6, 8));
  return new Date(year, month, day);
}

function getDayOfWeek(num: number): string {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return dayNames[num];
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

function getTempRangesString(mintemp: number, maxtemp: number): string {
  return `${mintemp}\xB0C ~ ${maxtemp}\xB0C`;
}

function set7dayForecast(forecast_data: Series[]): void {
  let seven_day_forecast: HTMLElement | null =
    document.getElementById("seven_day_forecast");
  if (seven_day_forecast) {
    seven_day_forecast.innerHTML = "";

    for (let day of forecast_data) {
      const forecast_element: HTMLDivElement = setDay(day);
      seven_day_forecast.appendChild(forecast_element);
    }
  }
}

function setDay(days_data: Series): HTMLDivElement {
  let forecast_item: HTMLDivElement = document.createElement("div");
  forecast_item.className = "forecast_item";

  // day
  const day_date: Date = getDate(days_data.date.toString());
  const day: string = getDayOfWeek(day_date.getDay());

  const forecast_day: HTMLDivElement = document.createElement("div");
  forecast_day.className = "forecast_day";
  forecast_day.innerText = day;
  forecast_item.appendChild(forecast_day);

  // icon
  const forecast_icon: HTMLImageElement = document.createElement("img");
  forecast_icon.className = "forecast_icon";
  forecast_icon.src = getIconSrc(days_data.weather);
  forecast_item.appendChild(forecast_icon);

  // temp ranges
  const temp_ranges: string = getTempRangesString(
    days_data.temp2m.min,
    days_data.temp2m.max
  );
  const forecast_temp_ranges: HTMLDivElement = document.createElement("div");
  forecast_temp_ranges.className = "forecast_temp_ranges";
  forecast_temp_ranges.innerText = temp_ranges;
  forecast_item.appendChild(forecast_temp_ranges);

  //description
  const weather_description: string = getWeatherDescription(days_data.weather);

  const forecast_descr: HTMLDivElement = document.createElement("div");
  forecast_descr.className = "forecast_descr";
  forecast_descr.innerText = weather_description;
  forecast_item.appendChild(forecast_descr);

  return forecast_item;
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
