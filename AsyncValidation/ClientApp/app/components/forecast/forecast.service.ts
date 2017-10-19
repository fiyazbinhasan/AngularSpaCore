import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { WeatherForecast, weatherForecasts } from './forecast-models';

@Injectable()
export class ForecastService {

    delayMs = 500;

    // Fake server get; assume nothing can go wrong
    getForecasts(): Observable<WeatherForecast[]> {
        return of(weatherForecasts).delay(this.delayMs); // simulate latency with delay
    }

    getForecastByDate(dateFormatted: string): Observable<WeatherForecast | undefined> {
        const existingForcast = weatherForecasts.find(w => w.dateFormatted === dateFormatted);
        return of(existingForcast).delay(this.delayMs); // simulate latency with delay
    }

    // Fake server update; assume nothing can go wrong
    updateForecast(weatherForecast: WeatherForecast): Observable<WeatherForecast> {
        const oldForecast = weatherForecasts.find(w => w.id === weatherForecast.id);
        const newForecast = Object.assign(oldForecast, weatherForecast); // Demo: mutate cached hero
        return of(newForecast).delay(this.delayMs); // simulate latency with delay
    }
}