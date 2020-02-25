import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest, Subscription } from 'rxjs';

import { User, UserRole } from '../../model/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataService, MEMORIAL_YEAR } from 'src/app/services/data.service';
import { ParticipationsService } from 'src/app/services/participations.service';
import { ProfileForm } from '../../components/forms/profile-form/profile-form.component';
import { HostDetailsForm } from 'src/app/components/forms/host-form/host-form.component';
import { Meeting } from 'src/app/model';

@Component({
  selector: 'app-host-page',
  templateUrl: './host-page.component.html',
  styleUrls: ['./host-page.component.scss']
})
export class HostPageComponent implements OnInit, OnDestroy {
  public user: User;
  public firebaseUser: firebase.User;
  public currentStep = 0;
  public currentStep$ = new Subject<number>();
  public subscriptions: Subscription[] = [];
  public year = MEMORIAL_YEAR;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataService: DataService,
    private participationsService: ParticipationsService
  ) { }

  ngOnInit() {
    this.authService.firebaseUser.subscribe(
      firebaseUser => (this.firebaseUser = firebaseUser)
    );

    this.subscriptions.push(
      combineLatest(this.authService.user, this.currentStep$).subscribe(
        ([user, currentStep]) => {
          this.user = user;
          this.currentStep = currentStep;

          // Auto navigations after the first step
          if (this.currentStep > 0) {
            if (user && user.role !== UserRole.host) {
              this.dataService.setUserRole(user, UserRole.host);
            }

            if (!user) {
              this.currentStep = 1;
              this.authService.requestToLogin();
            } else if (
              !this.participationsService.isParticipateHaveAllDetails(user)
            ) {
              this.currentStep = 2;
            } else {
              this.currentStep = currentStep > 2 ? currentStep : 3;
            }
          }
        }
      )
    );

    this.currentStep$.next(0);
  }

  onProfileSubmit(profileForm: ProfileForm) {
    this.dataService.setUserProfile(this.user, profileForm);
  }

  onNewMeeting(meetingDetails: HostDetailsForm) {
    this.dataService.createMeeting(this.user, meetingDetails).subscribe((meeting: Meeting) => {
      alert('נוצר מפגש בהצלחה!');
      this.router.navigate([`meetings/${this.year}/${meeting.hostId}/${meeting.id}`]);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
