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
      return "Cloudy";
      break;
    case "lightrain":
      return "Light rain";
      break;
    case "pcloudy":
      return "Partly cloudy";
      break;
    case "ts":
      return "Thunderstorm";
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
      return "Partly Cloudy";
      break;
    default:
      return "";
  }
}

function getTempRangesString(mintemp, maxtemp) {
  return `${mintemp}\xB0C - ${maxtemp}\xB0C`;
}

function set7dayForecast(forecast_data) {
  forecast_data.forEach((day) => {});
}

function setDay(days_data) {
  // day
  let day_date = getDate(todays_data.date.toString());
  let day = getDayOfWeek(day_date.getDay());
  // icon

  // temp ranges
  let temp_ranges = `${mintemp}\xB0C - ${maxtemp}\xB0C`;

  //description
}
