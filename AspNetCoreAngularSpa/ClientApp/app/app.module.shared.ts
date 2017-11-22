import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ForecastListComponent } from './components/forecast/forecast-list/forecast-list.component';
import { ForecastDetailComponent } from './components/forecast/forecast-detail/forecast-detail.component';
import { ForecastService } from './components/forecast/forecast.service';
import { ForcastValidators } from './components/forecast/forecast.validators';
import { CounterComponent } from './components/counter/counter.component';

import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserService } from './components/user/user.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        ForecastListComponent,
        ForecastDetailComponent,
        UserListComponent,
        UserDetailComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,

        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'forecasts', component: ForecastListComponent },
            { path: 'users', component: UserListComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [ForecastService, UserService, ForcastValidators] 
})
export class AppModuleShared {
}
