import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

import { WeatherForecast, weatherForecasts } from './forecast-models';

@Injectable()
export class ForecastService {
  delayMs = 500;

  // Fake server get; assume nothing can go wrong
  getForecasts(): Observable<WeatherForecast[]> {
    return of(weatherForecasts).pipe(delay(this.delayMs)); // simulate latency with delay
  }

  getForecastByDate(
    dateFormatted: string
  ): Observable<WeatherForecast | undefined> {
    const existingForcast = weatherForecasts.find(
      w => w.dateFormatted === dateFormatted
    );
    return of(existingForcast).pipe(delay(this.delayMs)); // simulate latency with delay
  }

  // Fake server update; assume nothing can go wrong
  updateForecast(
    weatherForecast: WeatherForecast
  ): Observable<WeatherForecast> {
    const oldForecast = weatherForecasts.find(w => w.id === weatherForecast.id);
    const newForecast = Object.assign(oldForecast, weatherForecast); // Demo: mutate cached hero
    return of(newForecast).pipe(delay(this.delayMs)); // simulate latency with delay
  }
}

export class ForecastDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  delayMs = 500;
  connect(): Observable<WeatherForecast[]> {
    return of(weatherForecasts).pipe(delay(this.delayMs));
  }

  disconnect() {}
}
