import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FlipCardComponent } from './components/flip-card/flip-card.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { MeetingsListComponent } from './components/meetings-list/meetings-list.component';
import { LoginComponent } from './components/login/login.component';
import { MeetingsMapComponent } from './components/meetings-map/meetings-map.component';

@NgModule({
  declarations: [
    AppComponent,
    FlipCardComponent,
    HomePageComponent,
    FlipCardComponent,
    AccountPageComponent,
    MeetingsPageComponent,
    MeetingsListComponent,
    LoginComponent,
    MeetingsMapComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBIQyGmuHzizv-MNxX4plVBLoErVopOEiE',
      language: 'iw',
      libraries: ['places']
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'he-IL' },
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
