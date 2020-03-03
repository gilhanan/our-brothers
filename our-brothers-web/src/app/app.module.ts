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
import {HomePageComponent} from './pages/home-page/home-page.component';
import {FlipCardComponent} from './components/flip-card/flip-card.component';
import {MeetingsPageComponent} from './pages/meetings-page/meetings-page.component';
import {LoginPopupComponent} from './components/popups/login-popup/login-popup.component';
import {MeetingsMapComponent} from './components/meetings-map/meetings-map.component';
import {ViewToggleComponent} from './components/view-toggle/view-toggle.component';
import {MeetingsFiltersComponent} from './components/meetings-filters/meetings-filters.component';
import {MeetingsMapGuideComponent} from './components/meetings-map-guide/meetings-map-guide.component';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {RegistrationFormComponent} from './components/forms/registration-form/registration-form.component';
import {ProfileFormComponent} from './components/forms/profile-form/profile-form.component';
import {MeetingsMapLegendComponent} from './components/meetings-map-legend/meetings-map-legend.component';
import {MeetingsMapMeetingComponent} from './components/meetings-map-meeting/meetings-map-meeting.component';
import {MeetingsMapNavigatorComponent} from './components/meetings-map-navigator/meetings-map-navigator.component';
import {TellPageComponent} from './pages/tell-page/tell-page.component';
import {RadioButtonComponent} from './components/radio-button/radio-button.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MeetingsComponent} from './components/meetings/meetings.component';
import {HostPageComponent} from './pages/host-page/host-page.component';
import {DropDownMenuComponent} from './components/drop-down-menu/drop-down-menu.component';
import {TellButtonComponent} from './components/tell-button/tell-button.component';
import {HostButtonComponent} from './components/host-button/host-button.component';
import {ParticipateButtonComponent} from './components/participate-button/participate-button.component';
import {ParticipationsButtonsComponent} from './components/participations-buttons/participations-buttons.component';
import {SlainFormComponent} from './components/forms/slain-form/slain-form.component';
import {BereavedProfileFormComponent} from './components/forms/bereaved-profile-form/bereaved-profile-form.component';
import {BereavedIntroComponent} from './components/bereaved-intro/bereaved-intro.component';
import {BereavedGuidanceFormComponent} from './components/forms/bereaved-guidance-form/bereaved-guidance-form.component';
import {RegistrationProgressBarComponent} from './components/registration-progress-bar/registration-progress-bar.component';
import {HostIntroComponent} from './components/host-intro/host-intro.component';
import {ParticipatePageComponent} from './pages/participate-page/participate-page.component';
import {ParticipateIntroComponent} from './participate-intro/participate-intro.component';
import {HostFormComponent} from './components/forms/host-form/host-form.component';
import {PlacesSelectComponent} from './components/places-select/places-select.component';
import {ForgotPasswordFormComponent} from './components/forms/forgot-password-form/forgot-password-form.component';
import {LoginSocialButtonComponent} from './components/login-social-button/login-social-button.component';
import {HostInputTextComponent} from './components/forms/host-input-text/host-input-text.component';
import {HostInputOptionsComponent} from './components/forms/host-input-options/host-input-options.component';
import {HeaderTogglerComponent} from './components/header-toggler/header-toggler.component';
import {PlaceMapComponent} from './components/place-map/place-map.component';
import {MeetingDetailsPageComponent} from './pages/meeting-details-page/meeting-details-page.component';
import {HostMeetingInputTextComponent} from './components/host-meeting-input-text/host-meeting-input-text.component';
import {DonatePageComponent} from './pages/donate-page/donate-page.component';
import {PaypalButtonComponent} from './components/paypal-button/paypal-button.component';
import {MeetingParticipatesListComponent} from './meeting-participates-list/meeting-participates-list.component';
import {ToastrModule} from "ngx-toastr";
import {CheckboxModule} from "./shared/components/checkbox/checkbox.module";
import {ListModule} from "./shared/components/list/list.module";
import {MeetingsListModule} from "./shared/components/meetings-list/meetings-list.module";
import {JoinButtonModule} from "./shared/components/join-button/join-button.module";
import {PipesModule} from "./shared/pipes/pipes.module";
import {FreeTextFilterModule} from "./shared/components/free-text-filter/free-text-filter.module";
import {ContactFormModule} from "./shared/components/contact-form/contact-form.module";

registerLocaleData(localeHe);

@NgModule({
  declarations: [
    AppComponent,
    FlipCardComponent,
    HomePageComponent,
    FlipCardComponent,
    MeetingsPageComponent,
    LoginPopupComponent,
    MeetingsMapComponent,
    ViewToggleComponent,
    MeetingsFiltersComponent,
    MeetingsMapGuideComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    ProfileFormComponent,
    MeetingsMapLegendComponent,
    MeetingsMapMeetingComponent,
    MeetingsMapNavigatorComponent,
    TellPageComponent,
    RadioButtonComponent,
    HeaderComponent,
    FooterComponent,
    MeetingsComponent,
    HostPageComponent,
    DropDownMenuComponent,
    TellButtonComponent,
    HostButtonComponent,
    ParticipateButtonComponent,
    ParticipationsButtonsComponent,
    SlainFormComponent,
    BereavedProfileFormComponent,
    BereavedIntroComponent,
    BereavedGuidanceFormComponent,
    RegistrationProgressBarComponent,
    HostIntroComponent,
    ParticipatePageComponent,
    ParticipateIntroComponent,
    HostFormComponent,
    PlacesSelectComponent,
    ForgotPasswordFormComponent,
    LoginSocialButtonComponent,
    HostInputTextComponent,
    HostInputOptionsComponent,
    HeaderTogglerComponent,
    PlaceMapComponent,
    MeetingDetailsPageComponent,
    HostMeetingInputTextComponent,
    DonatePageComponent,
    PaypalButtonComponent,
    MeetingParticipatesListComponent,
  ],
  imports: [
    /** Need to remove once everything is lazy loaded **/
    PipesModule,
    CheckboxModule,
    ListModule,
    MeetingsListModule,
    JoinButtonModule,
    FreeTextFilterModule,
    ContactFormModule,
    /** ----- **/
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
