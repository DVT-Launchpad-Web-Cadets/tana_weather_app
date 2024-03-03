/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.{html,ts}", "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      // WILL POSSIBLY USE THIS LATER
      //   gridTemplateColumns: {
      //     "forecast-today": "2fr 1fr",
      //     "forecast-item": "2fr 1fr 2.5fr",
      //   },
      //   gridTemplateRows: {
      //     "forecast-today": "1fr 1fr 0.5fr",
      //     "forecast-item": "1.5fr 1fr",
      //   },
      //   gridTemplateAreas: {
      //     "forecast-today": [
      //       "location-name weather-icon",
      //       "temp-ranges weather-icon",
      //       "weather-descr weather-icon",
      //     ],
      //     "forecast-item": [
      //       "forecast-day forecast-icon forecast-temp-ranges",
      //       "forecast-day forecast-icon forecast-descr",
      //     ],
      //   },
    },
  },
  plugins: [require("daisyui")],
};
