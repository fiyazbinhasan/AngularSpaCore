import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs'
import { ForecastService } from './forecast.service'
import 'rxjs/add/operator/map';

function isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}

@Injectable()
export class ForcastValidators {
    constructor(private forecastService: ForecastService) {

    }
    
    existingDateValidator(initialDate: string = ""): AsyncValidatorFn {
        return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
            if (isEmptyInputValue(control.value)) {
                return Observable.of(null);
            } else if (control.value === initialDate) {
                return Observable.of(null);
            }
            else {
                return this.forecastService.getForecastByDate(control.value).map(forecast => {
                    return forecast ? { 'existingDate': { value: control.value } } : null;
                });
            }
        };
    }
}

//(c: AbstractControl): ValidationErrors|null
//(c: AbstractControl): Promise<ValidationErrors|null>|Observable<ValidationErrors|null>