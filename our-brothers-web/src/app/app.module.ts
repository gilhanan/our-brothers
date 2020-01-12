import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

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

@NgModule({
  declarations: [
    AppComponent,
    FlipCardComponent,
    HomePageComponent,
    FlipCardComponent,
    AccountPageComponent,
    MeetingsPageComponent,
    MeetingsListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
