import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Meeting, MeetingParticipate, MeetingAudienceLabels } from 'src/app/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-meeting-details-page',
  templateUrl: './meeting-details-page.component.html',
  styleUrls: ['./meeting-details-page.component.scss']
})
export class MeetingDetailsPageComponent implements OnInit {
  public loadingMeeting = true;
  public meeting: Meeting;

  public loadingMeetingParticipates = true;
  public meetingParticipates: MeetingParticipate[];

  public audienceLabels = MeetingAudienceLabels;

  private getMeeting$: Subscription;
  private getMeetingParticipates$: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
    private dataService: DataService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const { hostId, meetingId } = params;

      if (this.getMeeting$) {
        this.getMeeting$.unsubscribe();
      }
      this.getMeeting$ = this.dataService.getMeeting(hostId, meetingId).subscribe(meeting => {
        this.loadingMeeting = false;
        return this.meeting = meeting;
      })

      if (this.getMeetingParticipates$) {
        this.getMeetingParticipates$.unsubscribe();
      }
      this.getMeetingParticipates$ = this.dataService.getMeetingParticipates(hostId, meetingId).subscribe(meetingParticipates => {
        this.loadingMeetingParticipates = false;
        return this.meetingParticipates = meetingParticipates;
      })
    });

  }
}
