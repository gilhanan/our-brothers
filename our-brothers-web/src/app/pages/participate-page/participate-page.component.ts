import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { User, Meeting, UserRole } from 'src/app/model';
import { AuthService } from 'src/app/services/auth.service';
import { ParticipationsService } from 'src/app/services/participations.service';
import { DataService } from 'src/app/services/data.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { ProfileForm } from 'src/app/components/forms/profile-form/profile-form.component';

@Component({
  selector: 'app-participate-page',
  templateUrl: './participate-page.component.html',
  styleUrls: ['./participate-page.component.scss']
})
export class ParticipatePageComponent implements OnInit {
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
          if (user && user.role !== UserRole.participate) {
            this.dataService.setUserRole(user, UserRole.participate);
          }

          if (!user) {
            this.currentStep$.next(1);
            this.authService.requestToLogin();
          } else if (!this.participationsService.isParticipateHaveAllDetails(user)) {
            this.currentStep$.next(2);
          } else {
            this.currentStep$.next(3);
          }
        }
      });

    this.dataService.getMeetings().subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  onProfileSubmit(profileForm: ProfileForm) {
    this.dataService.setUserProfile(this.user, profileForm);
  }

  onJoinMeeting(meeting: Meeting) {
    if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
      if (this.user.role === UserRole.participate) {
        this.dataService
          .participateRegisterHost(this.user, meeting)
          .subscribe(result => {
            if (result) {
              window.alert('שובצת בהצלחה!');
            }
          });
      }
    }
  }
}
