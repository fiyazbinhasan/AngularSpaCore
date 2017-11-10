import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ForecastListComponent } from './components/forecast/forecast-list/forecast-list.component';
import { ForecastDetailComponent } from './components/forecast/forecast-detail/forecast-detail.component';
import { ForecastService } from './components/forecast/forecast.service';
import { ForcastValidators } from './components/forecast/forecast.validators';
import { CounterComponent } from './components/counter/counter.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        ForecastListComponent,
        ForecastDetailComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'forecasts', component: ForecastListComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [ForecastService, ForcastValidators] 
})
export class AppModuleShared {
}
