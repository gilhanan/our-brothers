import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeHe from '@angular/common/locales/he';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FlipCardComponent } from './components/flip-card/flip-card.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { MeetingsPageComponent } from './pages/meetings-page/meetings-page.component';
import { MeetingsListComponent } from './components/meetings-list/meetings-list.component';
import { LoginPopupComponent } from './components/popups/login-popup/login-popup.component';
import { MeetingsMapComponent } from './components/meetings-map/meetings-map.component';
import { ViewToggleComponent } from './components/view-toggle/view-toggle.component';
import { MeetingsFiltersComponent } from './components/meetings-filters/meetings-filters.component';
import { MeetingsMapGuideComponent } from './components/meetings-map-guide/meetings-map-guide.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegistrationFormComponent } from './components/forms/registration-form/registration-form.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ProfileFormComponent } from './components/forms/profile-form/profile-form.component';
import { MeetingsMapLegendComponent } from './components/meetings-map-legend/meetings-map-legend.component';
import { MeetingsMapMeetingComponent } from './components/meetings-map-meeting/meetings-map-meeting.component';
import { MeetingsMapNavigatorComponent } from './components/meetings-map-navigator/meetings-map-navigator.component';
import { AdminBereavedsPageComponent } from './pages/admin-bereaveds-page/admin-bereaveds-page.component';
import { FreeTextFilterComponent } from './components/free-text-filter/free-text-filter.component';
import { BereavedsListComponent } from './components/bereaveds-list/bereaveds-list.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { ListColumnComponent } from './components/list-column/list-column.component';
import { ModalSelectMeetingComponent } from './components/modal-select-meeting/modal-select-meeting.component';
import { PhonePipe } from './pipes/phone.pipe';
import { SeniorityPipe } from './pipes/seniority.pipe';
import { TellPageComponent } from './pages/tell-page/tell-page.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { BereavedsListRowComponent } from './components/bereaveds-list-row/bereaveds-list-row.component';
import { SelectComponent } from './components/select/select.component';
import { SelectBereavedStatusComponent } from './components/select-bereaved-status/select-bereaved-status.component';
import { SelectBereavedGuidanceComponent } from './components/select-bereaved-guidance/select-bereaved-guidance.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { JoinButtonComponent } from './components/join-button/join-button.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HostPageComponent } from './pages/host-page/host-page.component';
import { MeetingListRowComponent } from './components/meeting-list-row/meeting-list-row.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { TellButtonComponent } from './components/tell-button/tell-button.component';
import { HostButtonComponent } from './components/host-button/host-button.component';
import { ParticipateButtonComponent } from './components/participate-button/participate-button.component';
import { ParticipationsButtonsComponent } from './components/participations-buttons/participations-buttons.component';
import { SlainFormComponent } from './components/forms/slain-form/slain-form.component';
import { BereavedProfileFormComponent } from './components/forms/bereaved-profile-form/bereaved-profile-form.component';
import { BereavedIntroComponent } from './components/bereaved-intro/bereaved-intro.component';
import { BereavedGuidanceFormComponent } from './components/forms/bereaved-guidance-form/bereaved-guidance-form.component';
import { RegistrationProgressBarComponent } from './components/registration-progress-bar/registration-progress-bar.component';
import { HostIntroComponent } from './components/host-intro/host-intro.component';
import { ParticipatePageComponent } from './pages/participate-page/participate-page.component';
import { ParticipateIntroComponent } from './participate-intro/participate-intro.component';
import { HostFormComponent } from './components/forms/host-form/host-form.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { PlacesSelectComponent } from './components/places-select/places-select.component';

registerLocaleData(localeHe);

@NgModule({
  declarations: [
    AppComponent,
    FlipCardComponent,
    HomePageComponent,
    FlipCardComponent,
    ContactPageComponent,
    MeetingsPageComponent,
    MeetingsListComponent,
    LoginPopupComponent,
    MeetingsMapComponent,
    ViewToggleComponent,
    MeetingsFiltersComponent,
    MeetingsMapGuideComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    CheckboxComponent,
    ProfileFormComponent,
    MeetingsMapLegendComponent,
    MeetingsMapMeetingComponent,
    AdminBereavedsPageComponent,
    FreeTextFilterComponent,
    BereavedsListComponent,
    ListHeaderComponent,
    ListColumnComponent,
    PhonePipe,
    SeniorityPipe,
    MeetingsMapNavigatorComponent,
    ModalSelectMeetingComponent,
    TellPageComponent,
    RadioButtonComponent,
    BereavedsListRowComponent,
    SelectComponent,
    SelectBereavedStatusComponent,
    SelectBereavedGuidanceComponent,
    HeaderComponent,
    FooterComponent,
    MeetingsComponent,
    JoinButtonComponent,
    AboutPageComponent,
    HostPageComponent,
    MeetingListRowComponent,
    ContactFormComponent,
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
    TeamPageComponent,
    TeamCardComponent,
    PlacesSelectComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
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
