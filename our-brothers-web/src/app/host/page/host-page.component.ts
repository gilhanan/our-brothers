import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { User, UserRole, Meeting } from 'models';
import { MEMORIAL_YEAR } from '../../shared/constants';
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';
import { ParticipationsService } from '../../shared/services/participations.service';
import { MeetingForm } from '../host-form/host-form.component';
import { ProfileForm } from '../../shared/components/profile-form/profile-form.types';

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
    private toastr: ToastrService,
    private participationsService: ParticipationsService
  ) {}

  ngOnInit() {
    this.authService.firebaseUser.subscribe(firebaseUser => (this.firebaseUser = firebaseUser));

    this.subscriptions.push(
      combineLatest([
        this.authService.user,
        this.currentStep$.pipe(
          distinctUntilChanged(),
          tap(() => {
            if (window.scrollTo) {
              window.scrollTo(0, 0);
            }
          })
        )
      ]).subscribe(([user, currentStep]) => {
        this.user = user;
        this.currentStep = currentStep;

        // Auto navigations after the first step
        if (this.currentStep > 0) {
          if (user) {
            if (user.role && user.role === UserRole.bereaved) {
              this.router.navigate(['/home']);
            } else if (user.role !== UserRole.host) {
              this.dataService.setUserRole(user, UserRole.host);
            }
          }

          if (!user) {
            this.currentStep = 1;
            this.authService.requestToLogin();
          } else if (!this.participationsService.isParticipateHaveAllDetails(user)) {
            this.currentStep = 2;
          } else {
            this.currentStep = currentStep > 2 ? currentStep : 3;
          }
        }
      })
    );

    this.currentStep$.next(0);
  }

  onProfileSubmit(profileForm: ProfileForm) {
    this.dataService.setUserProfile(this.user, profileForm);
  }

  onNewMeeting(meetingDetails: MeetingForm) {
    this.dataService.createMeeting(this.user, meetingDetails).subscribe(
      (meeting: Meeting) => {
        this.toastr.success('נוצר מפגש בהצלחה!');
        this.router.navigate([`meetings/${this.year}/${meeting.hostId}/${meeting.id}`]);
      },
      () => {
        this.toastr.error('שגיאה - לא ניתן ליצור מפגש. נא ליצור קשר.');
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
