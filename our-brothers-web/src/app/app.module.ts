import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeHe from '@angular/common/locales/he';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AgmCoreModule} from '@agm/core';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';

import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './shared/services/auth.service';
import {DataService} from './shared/services/data.service';
import {HomePageComponent} from './home/home-page.component';
import {LoginPopupComponent} from './components/popups/login-popup/login-popup.component';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {RegistrationFormComponent} from './components/forms/registration-form/registration-form.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ForgotPasswordFormComponent} from './components/forms/forgot-password-form/forgot-password-form.component';
import {LoginSocialButtonComponent} from './components/login-social-button/login-social-button.component';
import {HeaderTogglerComponent} from './components/header-toggler/header-toggler.component';
import {PaypalButtonComponent} from './components/paypal-button/paypal-button.component';
import {ToastrModule} from "ngx-toastr";
import {ContactFormModule} from "./shared/components/contact-form/contact-form.module";
import {DropDownMenuModule} from "./shared/components/drop-down-menu/drop-down-menu.module";
import {ParticipationsButtonsModule} from "./shared/components/participations-buttons/participations-buttons.module";

registerLocaleData(localeHe);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPopupComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordFormComponent,
    LoginSocialButtonComponent,
    HeaderTogglerComponent,
    PaypalButtonComponent,
  ],
  imports: [
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBIQyGmuHzizv-MNxX4plVBLoErVopOEiE',
      language: 'iw',
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'he-IL' },
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
