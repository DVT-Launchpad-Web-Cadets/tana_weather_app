import { ICityData } from "./cityData";
import { IForecastRoot } from "./forecast";

export interface IWeatherDataToStore {
  cityData: ICityData;
  forecastData: IForecastRoot;
  expirationTime: number; //Date now + 3 hours
}
