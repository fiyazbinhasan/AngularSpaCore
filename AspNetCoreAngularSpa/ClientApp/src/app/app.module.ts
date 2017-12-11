import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatIconModule, MatInputModule, MatToolbarModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';

import { NavMenuComponent } from './navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';
import { ForecastListComponent } from './forecast/forecast-list/forecast-list.component';
import { ForecastDetailComponent } from './forecast/forecast-detail/forecast-detail.component';
import { ForecastService } from './forecast/forecast.service';
import { ForcastValidators } from './forecast/forecast.validators';
import { CounterComponent } from './counter/counter.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';



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
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,

    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'forecasts', component: ForecastListComponent },
      { path: 'users', component: UserListComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [ForecastService, UserService, ForcastValidators] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
