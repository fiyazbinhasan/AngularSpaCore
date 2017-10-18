import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { WeatherForecast, weatherForecasts, summaries } from '../forecast-models';
import { ForecastService } from '../forecast.service';
import { existingDateValidator } from '../forecast.validators';

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
export class ForecastDetailComponent implements OnChanges, OnInit {
    @Input() forecast: WeatherForecast;
    summaries = summaries;

    forecastForm: FormGroup;
    
    get dateFormatted() { return this.forecastForm.get('dateFormatted'); }

    get temperatureC() { return this.forecastForm.get('temperatureC'); }

    constructor(
        private fb: FormBuilder,
        private forecastService: ForecastService) {

        this.createForm();
    }

    ngOnChanges(): void {
        this.forecastForm.reset({
            dateFormatted: this.forecast.dateFormatted,
            temperatureC: this.forecast.temperatureC,
            temperatureF: this.forecast.temperatureF,
            summary: this.forecast.summary
        });
    }

    ngOnInit(): void {
        this.dateFormatted!.setAsyncValidators(existingDateValidator(this.forecast.dateFormatted, this.forecastService));
    }

    createForm() {
        this.forecastForm = this.fb.group({
            dateFormatted: new FormControl('', [Validators.required, Validators.minLength(10)]),
            temperatureC: new FormControl('', [Validators.required]),
            temperatureF: '',
            summary: ''
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
            temperatureF: parseInt(formModel.temperatureF),
            summary: formModel.summary as string
        };
        return saveForcast;
    }
}