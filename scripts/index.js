import { getWeatherData } from "./api.js";
import { setDOM } from "./dom.js";

window.addEventListener("load", (event) => {
  getCoords("Johannesburg");
});
// The user should be able to click on a major city
// to get the weather for that location
const majorCities = document.querySelectorAll(".major_cities_scroll a");
majorCities.forEach((city) => {
  city.addEventListener("click", function (e) {
    console.log(city.innerText);
    getCoords(city.innerText);
  });
});

async function getCoords(city) {
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
      let longitude = data.major_cities[0][city][0].long;
      let latitude = data.major_cities[0][city][0].lat;
      callTheWeatherAPI(longitude, latitude, city);
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

function callTheWeatherAPI(longitude, latitude, city) {
  getWeatherData(longitude, latitude)
    .then((res) => {
      // mapping of results
      console.log(res);
      console.log("---");
      setDOM(res, city);
    })
    .catch(console.error)
    .finally(() => {
      // cleanup
    });
}
