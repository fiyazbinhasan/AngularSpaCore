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

    //onAddButtonClicked() {
    //    this.selectedForecast = { id: undefined, dateFormatted: '', temperatureC: 0, temperatureF: 0, summary: '' };
    //}
    //constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
    //    //http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
    //    //    this.forecasts = result.json() as WeatherForecast[];
    //    //}, error => console.error(error));

    //    this.forecasts = weatherForecasts;
    //}
}