import { AbstractControl, AsyncValidatorFn, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs'
import { ForecastService } from './forecast.service'
import 'rxjs/add/operator/map';

export function existingDateValidator(dateFormatted: string, forcastService: ForecastService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{[key: string]: any } | null> => {
        if (control.value !== dateFormatted)
            return forcastService.getForecastByDate(control.value).map(forecast => {
                return forecast ? { 'existingDate': { value: control.value } } : null;
            });
        else
            return Observable.of(null);
        //return (dateFormatted === control.value) ? { 'existingDate': { value: control.value } } : null;
    };
}

//(c: AbstractControl): ValidationErrors|null
//(c: AbstractControl): Promise<ValidationErrors|null>|Observable<ValidationErrors|null>