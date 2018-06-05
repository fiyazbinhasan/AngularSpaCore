import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  WeatherForecast,
  weatherForecasts,
  summaries
} from '../forecast-models';
import { ForecastService } from '../forecast.service';
import { ForcastValidators } from '../forecast.validators';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class ForcastErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}
@Component({
  selector: 'app-forecast-detail',
  templateUrl: './forecast-detail.component.html',
  styleUrls: ['./forecast-detail.component.css']
})
export class ForecastDetailComponent implements OnChanges {
  matcher = new ForcastErrorStateMatcher();
  @Input() forecast: WeatherForecast;
  summaries = summaries;

  submitted = false;
  forecastForm: FormGroup;

  get dateFormatted() {
    return this.forecastForm.get('dateFormatted');
  }

  get temperatureC() {
    return this.forecastForm.get('temperatureC');
  }

  constructor(
    private fb: FormBuilder,
    private forecastService: ForecastService,
    private forecastValidators: ForcastValidators
  ) {}

  ngOnChanges(): void {
    this.forecastForm = new FormGroup(
      {
        dateFormatted: new FormControl(this.forecast.dateFormatted, {
          validators: Validators.required,
          asyncValidators: [
            this.forecastValidators.existingDateValidator(
              this.forecast.dateFormatted
            )
          ]
        }),
        temperatureC: new FormControl(this.forecast.temperatureC),
        temperatureF: new FormControl(this.forecast.temperatureF),
        summary: new FormControl(this.forecast.summary)
      },
      { updateOn: 'submit' }
    );
  }

  onSubmit() {
    if (this.forecastForm.pending) {
      this.forecastForm.statusChanges.subscribe(status => {
        if (status === 'VALID') {
          this.updateForcast();
        }
      });
    } else {
      if (this.forecastForm.valid) {
        this.updateForcast();
      }
    }
  }

  updateForcast() {
    this.forecastService.updateForecast(this.prepareSaveForecast()).subscribe();
    this.ngOnChanges();
  }

  prepareSaveForecast(): WeatherForecast {
    const formModel = this.forecastForm.value;

    const saveForcast: WeatherForecast = {
      id: this.forecast.id,
      dateFormatted: formModel.dateFormatted,
      temperatureC: parseInt(formModel.temperatureC, 10),
      temperatureF: formModel.temperatureF,
      summary: formModel.summary
    };
    return saveForcast;
  }
}
