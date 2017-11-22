import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { WeatherForecast, weatherForecasts } from '../forecast-models';
import { ForecastService, ForecastDataSource } from '../forecast.service';

@Component({
    selector: 'forecast-list',
    templateUrl: './forecast-list.component.html',
    styleUrls: ['./forecast-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ForecastListComponent {
    selectedForecast: WeatherForecast;

    displayedColumns = ['id', 'dateFormatted', 'temperatureC', 'temperatureF', 'summary'];
    dataSource: any; 

    constructor(private forecastService: ForecastService) { }

    ngOnInit() {
        this.dataSource = new ForecastDataSource();
    }

    select(selectedForecast: WeatherForecast) {
        this.selectedForecast = selectedForecast;
    }
}