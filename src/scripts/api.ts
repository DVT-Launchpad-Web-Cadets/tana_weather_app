export function getWeatherData(longitude, latitude) {
  return fetch(
    `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`
  ).then((response) => response.json());
}
