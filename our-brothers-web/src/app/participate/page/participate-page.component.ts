import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest, Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { User, Meeting, UserRole } from 'models';
import { MEMORIAL_YEAR } from '../../shared/constants';
import { AuthService } from '../../shared/services/auth.service';
import { ParticipationsService } from '../../shared/services/participations.service';
import { DataService } from '../../shared/services/data.service';
import { ProfileForm } from '../../shared/components/profile-form/profile-form.types';

@Component({
  selector: 'app-participate-page',
  templateUrl: './participate-page.component.html',
  styleUrls: ['./participate-page.component.scss']
})
export class ParticipatePageComponent implements OnInit, OnDestroy {
  public user: User;
  public firebaseUser: firebase.User;
  public meetings: Meeting[];
  public currentStep: number = 0;
  public currentStep$ = new Subject<number>();
  public year = MEMORIAL_YEAR;

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private participationsService: ParticipationsService,
    private toastr: ToastrService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.authService.firebaseUser.subscribe(firebaseUser => (this.firebaseUser = firebaseUser));

    this.subscriptions.push(
      combineLatest(
        this.authService.user,
        this.currentStep$.pipe(
          distinctUntilChanged(),
          tap(() => {
            if (window.scrollTo) {
              window.scrollTo(0, 0);
            }
          })
        )
      ).subscribe(([user, currentStep]) => {
        this.user = user;
        this.currentStep = currentStep;

        // Auto navigations after the first step
        if (currentStep > 0) {
          if (user) {
            if (user.role && user.role === UserRole.bereaved && !user.isAdmin) {
              this.router.navigate(['/home']);
            } else if (user.role !== UserRole.participate) {
              this.dataService.setUserRole(user, UserRole.participate);
            }
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
      })
    );

    this.subscriptions.push(
      this.dataService.getMeetings().subscribe(meetings => {
        this.meetings = meetings;
      })
    );
  }

  onProfileSubmit(profileForm: ProfileForm) {
    this.dataService.setUserProfile(this.user, profileForm);
  }

  onJoinMeeting(meeting: Meeting) {
    if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
      if (this.user.role !== UserRole.bereaved) {
        const accompanies = this.getAccompanies();

        this.dataService.participateRegisterHost(this.user, meeting, accompanies).subscribe(
          () => {
            this.toastr.success('שובצת בהצלחה!');
            this.router.navigate([`meetings/${this.year}/${meeting.hostId}/${meeting.id}`]);
          },
          () => {
            this.toastr.error('שגיאה - לא ניתן להשתבץ למפגש. נא ליצור קשר.');
          }
        );
      }
    }
  }

  getAccompanies(): number {
    let accompaniesAnswer = window.prompt('האם יגיעו איתך אנשים נוספים?', '0');

    let number = Number.parseInt(accompaniesAnswer);

    while (!(!Number.isNaN(number) && number >= 0 && number <= 7)) {
      accompaniesAnswer = window.prompt('נא להזין מספר משתתפים בין 0 ל-7', '0');
      number = Number.parseInt(accompaniesAnswer);
    }

    return number;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
