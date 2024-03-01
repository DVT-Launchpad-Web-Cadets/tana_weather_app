import { IForecastRoot } from "../models/forecast";
import { ICityData } from "../models/cityData.js";
import { EMPTY, catchError, switchMap, map, ReplaySubject } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { fromPromise } from "rxjs/internal/observable/innerFrom";

export const weatherFetchRequest$ = new ReplaySubject<ICityData>();

export const weatherResultSet$ = weatherFetchRequest$.pipe(
  switchMap((city) =>
    fromFetch(
      `http://www.7timer.info/bin/api.pl?lon=${city.longitude}&lat=${city.latitude}&product=civillight&output=json`
    ).pipe(
      switchMap((res) => fromPromise<IForecastRoot>(res.json())),
      map((json) => ({
        product: json.product,
        init: json.init,
        dataseries: json.dataseries,
      })),
      catchError((error) => {
        console.error("JSON Parsing has failed: ", error);
        return EMPTY;
      })
    )
  ),
  catchError((error) => {
    console.error("API Call has failed: ", error);
    return EMPTY;
  })
);
