import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeHe from '@angular/common/locales/he';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { HomePageComponent } from './home/home-page.component';
import { ContactFormModule } from './shared/components/contact-form/contact-form.module';
import { DropDownMenuModule } from './shared/components/drop-down-menu/drop-down-menu.module';
import { ParticipationsButtonsModule } from './shared/components/participations-buttons/participations-buttons.module';
import { ShellModule } from './shell/shell.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeHe);

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    ShellModule,
    AuthModule,
    ParticipationsButtonsModule,
    ContactFormModule,
    DropDownMenuModule,
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBIQyGmuHzizv-MNxX4plVBLoErVopOEiE',
      language: 'iw',
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'he-IL' }, AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
