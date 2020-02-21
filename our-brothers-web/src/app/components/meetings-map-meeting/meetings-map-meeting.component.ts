import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Meeting, MeetingAudience, MeetingAudienceLabels, User } from '../../../app/model';
import { ParticipationsService } from 'src/app/services/participations.service';

@Component({
  selector: 'app-meetings-map-meeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meetings-map-meeting.component.html',
  styleUrls: ['./meetings-map-meeting.component.scss']
})
export class MeetingsMapMeetingComponent {

  @Input() meeting: Meeting;
  @Input() user: User;

  @Output() joinMeeting = new EventEmitter<void>();

  constructor(public participationsService: ParticipationsService) { }

  getAudienceLabel(meetingAudience: MeetingAudience[]) {
    return meetingAudience.map((audience: MeetingAudience) => MeetingAudienceLabels[audience]).join(', ');
  }
}
