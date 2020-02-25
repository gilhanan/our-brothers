import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Meeting, MeetingAudience, User } from 'models';
import { ParticipationsService } from 'src/app/services/participations.service';
import { MEMORIAL_YEAR } from 'src/app/services/data.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  year = MEMORIAL_YEAR;

  constructor(public utilsService: UtilsService,
    public participationsService: ParticipationsService) { }
}
