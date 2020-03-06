import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Meeting, User } from 'models';
import { MEMORIAL_YEAR } from '../../../../constants';
import { ParticipationsService } from '../../../../services/participations.service';

@Component({
  selector: 'app-meeting-list-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meeting-list-row.component.html',
  styleUrls: ['./meeting-list-row.component.scss']
})
export class MeetingListRowComponent {
  @Input() user: User;
  @Input() meeting: Meeting;
  @Input() showBereaved = true;
  @Output() joinMeeting = new EventEmitter<Meeting>();

  public year = MEMORIAL_YEAR;

  constructor(public participationsService: ParticipationsService) {}
}
