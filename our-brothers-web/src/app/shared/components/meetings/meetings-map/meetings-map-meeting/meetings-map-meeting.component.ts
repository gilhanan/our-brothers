import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Meeting, User } from 'models';
import { MEMORIAL_YEAR } from '../../../../constants';
import { ParticipationsService } from '../../../../services/participations.service';
import { UtilsService } from '../../../../services/utils.service';

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

  constructor(public utilsService: UtilsService, public participationsService: ParticipationsService) {}
}
