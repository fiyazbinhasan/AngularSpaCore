import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { WeatherForecast, weatherForecasts, summaries } from '../forecast-models';
import { ForecastService } from '../forecast.service';
import { ForcastValidators } from '../forecast.validators';

@Component({
    selector: 'forecast-detail',
    templateUrl: './forecast-detail.component.html',
    styles: [`.ng-valid:not(form) {
                    border-left: 5px solid #42A948; /* green */
                }
                .ng-invalid:not(form)  {
                    border-left: 5px solid #a94442; /* red */
            }`]
})
export class ForecastDetailComponent implements OnChanges {
    @Input() forecast: WeatherForecast;
    summaries = summaries;

    forecastForm: FormGroup;
    
    get dateFormatted() { return this.forecastForm.get('dateFormatted'); }

    get temperatureC() { return this.forecastForm.get('temperatureC'); }

    constructor(
        private fb: FormBuilder,
        private forecastService: ForecastService,
        private forecastValidators: ForcastValidators) {
    }
    
    ngOnChanges(): void {
        this.forecastForm = this.fb.group({
            dateFormatted: new FormControl(this.forecast.dateFormatted, [Validators.required, Validators.minLength(10)], [this.forecastValidators.existingDateValidator(this.forecast.dateFormatted)]),
            temperatureC: new FormControl(this.forecast.temperatureC, [Validators.required]),
            temperatureF: this.forecast.temperatureF,
            summary: this.forecast.summary
        });
    }

    onSubmit() {
        this.forecast = this.prepareSaveForecast();
        this.forecastService.updateForecast(this.forecast).subscribe(/* error handling */);
        this.ngOnChanges();
    }

    prepareSaveForecast(): WeatherForecast {
        const formModel = this.forecastForm.value;
       
        const saveForcast: WeatherForecast = {
            id: this.forecast.id,
            dateFormatted: formModel.dateFormatted,
            temperatureC: parseInt(formModel.temperatureC),
            temperatureF: formModel.temperatureF,
            summary: formModel.summary
        };
        return saveForcast;
    }
}