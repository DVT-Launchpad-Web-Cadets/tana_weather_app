export function setDOM(results, city) {
  // console.log(results.dataseries[0].date);
  // console.log(results.dataseries[0].temp2m.max);
  // console.log(results.dataseries[0].temp2m.min);
  // console.log(results.dataseries[0].weather);

  setTodayElement(results.dataseries[0], city);

  console.log(results.dataseries);
  set7dayForecast(results.dataseries);
}

function setTodayElement(todays_data, city) {
  // todays date
  let todays_date = getDate(todays_data.date.toString());
  const monthNames = [
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
  let datestring = `${getDayOfWeek(
    todays_date.getDay()
  )}, ${todays_date.getDate()} ${
    monthNames[todays_date.getMonth()]
  } ${todays_date.getFullYear()}`;
  let todayElement = document.getElementById("todaysdate");
  todayElement.innerText = datestring;

  // location name
  let location = document.getElementById("location_name");
  location.innerText = city;

  // temp_ranges
  let temp_ranges = document.getElementById("temp_ranges");
  temp_ranges.innerText = getTempRangesString(
    todays_data.temp2m.min,
    todays_data.temp2m.max
  );

  // weather description
  let weatherdescription = getWeatherDescription(todays_data.weather);
  let weather = document.getElementById("weather_descr");
  weather.innerText = weatherdescription;

  // weather icon
  let icon = document.getElementById("weather_icon");
  icon.src = getIconSrc(todays_data.weather);
}

function getDate(datestring) {
  let year = Number(datestring.substring(0, 4));
  let month = Number(datestring.substring(4, 6)) - 1;
  let day = Number(datestring.substring(6, 8));
  return new Date(year, month, day);
}

function getDayOfWeek(num) {
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

function getWeatherDescription(weather) {
  if (!weather) return "";

  switch (weather) {
    case "clear":
      return "Clear";
      break;
    case "cloudy":
      return "Overcast";
      break;
    case "lightrain":
      return "Light rain";
      break;
    case "pcloudy":
      return "Partly cloudy";
      break;
    case "ts":
      return "Isolated thunderstorms";
      break;
    case "snow":
      return "Snow";
      break;
    case "rain":
      return "Rain";
      break;
    case "tsrain":
      return "Thunderstorm";
      break;
    case "mcloudy":
      return "Cloudy";
      break;
    case "humid":
      return "Foggy";
      break;
    case "oshower":
      return "Occasional showers";
      break;
    case "ishower":
      return "Isolated showers";
      break;
    case "lightsnow":
      return "Light snow";
      break;
    case "rainsnow":
      return "Ice pellets/Freezing rain";
      break;
    default:
      return "Windy";
  }
}

function getTempRangesString(mintemp, maxtemp) {
  return `${mintemp}\xB0C ~ ${maxtemp}\xB0C`;
}

function set7dayForecast(forecast_data) {
  let seven_day_forecast = document.getElementById("seven_day_forecast");
  seven_day_forecast.innerHTML = "";
  forecast_data.forEach((day) => {
    let forecast_element = setDay(day);
    seven_day_forecast.appendChild(forecast_element);
  });
}

function setDay(days_data) {
  const forecast_item = document.createElement("div");
  forecast_item.className = "forecast_item";

  // day
  let day_date = getDate(days_data.date.toString());
  let day = getDayOfWeek(day_date.getDay());

  const forecast_day = document.createElement("div");
  forecast_day.className = "forecast_day";
  forecast_day.innerText = day;
  forecast_item.appendChild(forecast_day);

  // icon
  const forecast_icon = document.createElement("img");
  forecast_icon.className = "forecast_icon";
  forecast_icon.src = getIconSrc(days_data.weather);
  forecast_item.appendChild(forecast_icon);

  // temp ranges
  let temp_ranges = getTempRangesString(
    days_data.temp2m.min,
    days_data.temp2m.max
  );
  const forecast_temp_ranges = document.createElement("div");
  forecast_temp_ranges.className = "forecast_temp_ranges";
  forecast_temp_ranges.innerText = temp_ranges;
  forecast_item.appendChild(forecast_temp_ranges);

  //description
  let weather_description = getWeatherDescription(days_data.weather);

  const forecast_descr = document.createElement("div");
  forecast_descr.className = "forecast_descr";
  forecast_descr.innerText = weather_description;
  forecast_item.appendChild(forecast_descr);

  return forecast_item;
}

function getIconSrc(weather) {
  if (!weather) return "";

  switch (weather) {
    case "clear":
      return "icons/clear.png";
      break;
    case "cloudy":
      return "icons/overcast.png";
      break;
    case "lightrain":
      return "icons/raining.png";
      break;
    case "pcloudy":
      return "icons/pcloudy.png";
      break;
    case "ts":
      return "icons/storm.png";
      break;
    case "snow":
      return "icons/snow.png";
      break;
    case "rain":
      return "icons/raining.png";
      break;
    case "tsrain":
      return "icons/storm.png";
      break;
    case "mcloudy":
      return "icons/pcloudy.png";
      break;
    case "humid":
      return "icons/fog.png";
      break;
    case "oshower":
      return "icons/raining.png";
      break;
    case "ishower":
      return "icons/raining.png";
      break;
    case "lightsnow":
      return "icons/snow.png";
      break;
    case "rainsnow":
      return "icons/snow.png";
      break;
    default:
      return "icons/wind.png";
  }
}
