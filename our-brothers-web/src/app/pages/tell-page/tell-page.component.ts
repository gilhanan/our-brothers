import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import {
  Meeting,
  User,
  BereavedProfile,
  Slain,
  UserRole,
  BereavedGuidance
} from 'src/app/model';
import { AuthService } from 'src/app/services/auth.service';
import { ParticipationsService } from 'src/app/services/participations.service';
import { DataService } from 'src/app/services/data.service';
import { SlainForm } from 'src/app/components/forms/slain-form/slain-form.component';
import { BereavedProfileForm } from 'src/app/components/forms/bereaved-profile-form/bereaved-profile-form.component';

@Component({
  selector: 'app-tell-page',
  templateUrl: './tell-page.component.html',
  styleUrls: ['./tell-page.component.scss']
})
export class TellPageComponent implements OnInit {
  public user: User;
  public firebaseUser: firebase.User;
  public meetings: Meeting[];
  public currentStep: number = 0;
  public currentStep$ = new Subject<number>();

  constructor(
    private authService: AuthService,
    private participationsService: ParticipationsService,
    private dataService: DataService
  ) { }

  ngOnInit() {

    this.authService.firebaseUser.subscribe((firebaseUser) => this.firebaseUser = firebaseUser);

    combineLatest(
      this.authService.user,
      this.currentStep$.pipe(distinctUntilChanged()))
      .subscribe(([user, currentStep]) => {

        this.user = user;
        this.currentStep = currentStep;

        // Auto navigations after the first step
        if (currentStep > 0) {
          if (user && user.role !== UserRole.bereaved) {
            this.dataService.setUserRole(user, UserRole.bereaved);
          }

          if (!user) {
            this.currentStep$.next(1);
            this.authService.requestToLogin();
          } else if (!this.participationsService.isBereavedHaveAllDetails(user)) {
            this.currentStep$.next(2);
          } else if (!this.participationsService.isBrotherHaveSlainDetails(user)) {
            this.currentStep$.next(3);
          } else if (!this.participationsService.isBrotherAnsweredTrainingMeeting(user)) {
            this.currentStep$.next(4);
          } else {
            this.currentStep$.next(5);
          }
        }
      });

    this.dataService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  onProfileSubmit(profileForm: BereavedProfileForm) {
    this.dataService.setUserProfile(this.user, profileForm);
  }

  onSlainsSubmit(slainForm: SlainForm) {

    const slains: Slain[] = [{
      firstName: slainForm.firstName,
      lastName: slainForm.lastName,
      deathDate: slainForm.deathDate
    }];

    const story = slainForm.story;

    const bereavedProfile: BereavedProfile = {
      slains,
      story
    };

    this.dataService.setBereavedProfile(this.user, bereavedProfile);
  }

  onGuidanceSubmit(bereavedGuidance: BereavedGuidance) {
    this.dataService.setBereavedGuidanceAnswer(this.user, bereavedGuidance);
  }

  onJoinMeeting(meeting: Meeting) {
    if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
      if (this.user.role === 'bereaved') {
        this.dataService
          .bereavedRegisterHost(this.user, meeting)
          .subscribe(result => {
            if (result) {
              window.alert('שובצת בהצלחה!');
            }
          });
      }
    }
  }
}
