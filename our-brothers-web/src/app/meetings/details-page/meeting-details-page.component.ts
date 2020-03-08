import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Meeting, MeetingParticipate, User } from 'models';
import { DataService } from '../../shared/services/data.service';
import { UtilsService } from '../../shared/services/utils.service';
import { AuthService } from '../../shared/services/auth.service';

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

  private user$: Subscription;
  private getMeeting$: Subscription;
  private getMeetingParticipates$: Subscription;

  constructor(
    public utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => (this.user = user));

    this.activatedRoute.params.subscribe(params => {
      const { hostId, meetingId, memorialYear } = params;

      this.year = memorialYear;

      if (this.getMeeting$) {
        this.getMeeting$.unsubscribe();
      }

      this.getMeeting$ = this.dataService.getMeeting(hostId, meetingId, this.year).subscribe(meeting => {
        this.loadingMeeting = false;
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
