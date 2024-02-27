export interface ForecastRoot {
  product: string;
  init: string;
  dataseries: Series[];
}

export interface Series {
  date: number;
  weather: string;
  temp2m: Temp2m;
  wind10m_max: number;
}

export interface Temp2m {
  max: number;
  min: number;
}
