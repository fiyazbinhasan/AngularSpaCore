import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { WeatherForecast, weatherForecasts } from '../forecast-models';
import { ForecastService, ForecastDataSource } from '../forecast.service';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForecastListComponent implements OnInit {
  selectedForecast: WeatherForecast;

  displayedColumns = [
    'id',
    'dateFormatted',
    'temperatureC',
    'temperatureF',
    'summary'
  ];
  dataSource: any;

  constructor(private forecastService: ForecastService) {}

  ngOnInit() {
    this.dataSource = new ForecastDataSource();
    this.selectedForecast = undefined;
  }

  select(selectedForecast: WeatherForecast) {
    this.selectedForecast = selectedForecast;
  }
}
