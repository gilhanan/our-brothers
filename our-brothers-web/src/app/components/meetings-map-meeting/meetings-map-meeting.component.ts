import { Component, Input } from '@angular/core';
import { Meeting, MeetingAudience, MeetingAudienceLabels } from 'src/app/model';

@Component({
  selector: 'app-meetings-map-meeting',
  templateUrl: './meetings-map-meeting.component.html',
  styleUrls: ['./meetings-map-meeting.component.scss']
})
export class MeetingsMapMeetingComponent {

  @Input() meeting: Meeting;

  constructor() { }

  getAudienceLabel(meetingAudience: MeetingAudience[]) {
    return meetingAudience.map((audience: MeetingAudience) => MeetingAudienceLabels[audience]).join(', ');
  }

}
