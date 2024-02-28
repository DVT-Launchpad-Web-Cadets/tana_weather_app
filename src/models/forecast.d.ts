export interface IForecastRoot {
  product: string;
  init: string;
  dataseries: ISeries[];
}

export interface ISeries {
  date: number;
  weather: string;
  temp2m: ITemp2m;
  wind10m_max: number;
}

export interface ITemp2m {
  max: number;
  min: number;
}
