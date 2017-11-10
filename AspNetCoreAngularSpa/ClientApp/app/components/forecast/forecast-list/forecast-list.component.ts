import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { WeatherForecast, weatherForecasts } from '../forecast-models';
import { ForecastService } from '../forecast.service';

@Component({
    selector: 'forecast-list',
    templateUrl: './forecast-list.component.html'
})
export class ForecastListComponent {
    isLoading = false;
    selectedForecast: WeatherForecast;
    forecasts: Observable<WeatherForecast[]>;

    constructor(private forecastService: ForecastService) { }

    ngOnInit() { this.getForecasts(); }

    getForecasts() {
        this.isLoading = true;
        this.forecasts = this.forecastService.getForecasts()
            .finally(() => this.isLoading = false);
    }

    select(selectedForecast: WeatherForecast) {
        this.selectedForecast = selectedForecast;
    }
}