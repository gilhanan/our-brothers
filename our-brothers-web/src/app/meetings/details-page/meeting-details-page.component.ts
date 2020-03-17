import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Meeting, MeetingParticipate, User, UserRole } from 'models';
import { DataService } from '../../shared/services/data.service';
import { UtilsService } from '../../shared/services/utils.service';
import { AuthService } from '../../shared/services/auth.service';
import { ParticipationsService } from 'src/app/shared/services/participations.service';

@Component({
  selector: 'app-meeting-details-page',
  templateUrl: './meeting-details-page.component.html',
  styleUrls: ['./meeting-details-page.component.scss']
})
export class MeetingDetailsPageComponent implements OnInit, OnDestroy {
  public user: User;

  public loadingMeeting = true;
  public meeting: Meeting;
  public year: number;

  public loadingMeetingParticipates = true;
  public meetingParticipates: MeetingParticipate[];

  public extraData = false;

  private user$: Subscription;
  private getMeeting$: Subscription;
  private getMeetingParticipates$: Subscription;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toastr: ToastrService,
    public authService: AuthService,
    public dataService: DataService,
    public utilsService: UtilsService,
    public participationsService: ParticipationsService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.extraData = this.extraData || user.isAdmin;
      return (this.user = user);
    });

    this.activatedRoute.params.subscribe(params => {
      const { hostId, meetingId, memorialYear } = params;

      this.year = memorialYear;

      if (this.getMeeting$) {
        this.getMeeting$.unsubscribe();
      }

      this.getMeeting$ = this.dataService.getMeeting(hostId, meetingId, this.year).subscribe(meeting => {
        this.loadingMeeting = false;
        this.extraData =
          this.extraData ||
          this.participationsService.isHostParticipatingMeeting(this.user, meeting) ||
          this.participationsService.isBereavedParticipatingMeeting(this.user, meeting);
        return (this.meeting = meeting);
      });

      if (this.getMeetingParticipates$) {
        this.getMeetingParticipates$.unsubscribe();
      }
      this.getMeetingParticipates$ = this.dataService
        .getMeetingParticipates(hostId, meetingId, this.year)
        .subscribe(meetingParticipates => {
          this.loadingMeetingParticipates = false;
          return (this.meetingParticipates = meetingParticipates);
        });
    });
  }

  onDelete() {
    if (window.confirm('האם ברצונך למחוק את המפגש?')) {
      this.dataService.deleteMeeting(this.meeting.hostId, this.meeting.id, this.year).subscribe(
        () => {
          this.toastr.success('מפגש נמחק בהצלחה!');
          this.router.navigate(['/meetings']);
        },
        () => {
          this.toastr.error('שגיאה - לא ניתן למחוק מפגש. נא ליצור קשר.');
        }
      );
    }
  }

  onBereavedLeaveMeeting() {
    if (this.meeting && this.user) {
      if (window.confirm('האם ברצונך לצאת מהמפגש?')) {
        this.dataService.bereavedLeaveMeeting(this.user, this.meeting).subscribe(
          () => {
            this.toastr.success('הוסרת מהמפגש בהצלחה');
          },
          () => {
            this.toastr.error('שגיאה - לא ניתן לצאת מהמפגש. נא ליצור קשר');
          }
        );
      }
    }
  }

  onParticipateLeaveMeeting() {
    if (this.meeting && this.user) {
      if (window.confirm('האם ברצונך לצאת מהמפגש?')) {
        this.dataService.participateLeaveMeeting(this.user, this.meeting).subscribe(
          () => {
            this.toastr.success('הוסרת מהמפגש בהצלחה');
          },
          () => {
            this.toastr.error('שגיאה - לא ניתן לצאת מהמפגש. נא ליצור קשר');
          }
        );
      }
    }
  }

  onBereavedJoinMeeting() {
    if (this.meeting && this.user) {
      if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
        this.dataService.bereavedJoinMeeting(this.user, this.meeting).subscribe(
          () => {
            this.toastr.success('שובצת בהצלחה');
          },
          () => {
            this.toastr.error('שגיאה - לא ניתן להשתבץ למפגש. נא ליצור קשר');
          }
        );
      }
    }
  }

  onParticipateJoinMeeting() {
    if (this.meeting && this.user) {
      if (window.confirm('האם ברצונך להשתבץ למפגש?')) {
        this.dataService.participateJoinMeeting(this.user, this.meeting, this.getAccompanies()).subscribe(
          () => {
            this.toastr.success('שובצת בהצלחה');
          },
          () => {
            this.toastr.error('שגיאה - לא ניתן להשתבץ למפגש. נא ליצור קשר');
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
    if (this.user$) {
      this.user$.unsubscribe();
    }
    if (this.getMeeting$) {
      this.getMeeting$.unsubscribe();
    }
    if (this.getMeetingParticipates$) {
      this.getMeetingParticipates$.unsubscribe();
    }
  }
}
