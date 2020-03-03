import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  public loadingMeetingParticipates = true;
  public meetingParticipates: MeetingParticipate[];

  private user$: Subscription;
  private getMeeting$: Subscription;
  private getMeetingParticipates$: Subscription;

  constructor(
    public utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => (this.user = user));

    this.activatedRoute.params.subscribe(params => {
      const { hostId, meetingId } = params;

      if (this.getMeeting$) {
        this.getMeeting$.unsubscribe();
      }
      this.getMeeting$ = this.dataService
        .getMeeting(hostId, meetingId)
        .subscribe(meeting => {
          this.loadingMeeting = false;
          return (this.meeting = meeting);
        });

      if (this.getMeetingParticipates$) {
        this.getMeetingParticipates$.unsubscribe();
      }
      this.getMeetingParticipates$ = this.dataService
        .getMeetingParticipates(hostId, meetingId)
        .subscribe(meetingParticipates => {
          this.loadingMeetingParticipates = false;
          return (this.meetingParticipates = meetingParticipates);
        });
    });
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
