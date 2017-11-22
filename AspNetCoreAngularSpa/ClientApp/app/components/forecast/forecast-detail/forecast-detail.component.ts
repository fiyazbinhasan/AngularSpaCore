import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { WeatherForecast, weatherForecasts, summaries } from '../forecast-models';
import { ForecastService } from '../forecast.service';
import { ForcastValidators } from '../forecast.validators';

@Component({
    selector: 'forecast-detail',
    templateUrl: './forecast-detail.component.html',
    styleUrls: ['./forecast-detail.component.css']
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
        this.forecastForm = new FormGroup({
            dateFormatted: new FormControl(this.forecast.dateFormatted, { validators: Validators.required, asyncValidators: [this.forecastValidators.existingDateValidator(this.forecast.dateFormatted)] }),
            temperatureC: new FormControl(this.forecast.temperatureC, [Validators.required]),
            temperatureF: new FormControl(this.forecast.temperatureF),
            summary: new FormControl(this.forecast.summary)
        }, { updateOn: 'submit' });
    }

    onSubmit() {
        this.forecastForm.statusChanges.subscribe((status) => {
            if (status === "VALID") {
                this.forecast = this.prepareSaveForecast();
                this.forecastService.updateForecast(this.forecast).subscribe(/* error handling */);
                this.ngOnChanges();
            }
        });
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