import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Meeting, User } from 'src/app/model';
import { ParticipationsService } from 'src/app/services/participations.service';

@Component({
  selector: 'app-meeting-list-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meeting-list-row.component.html',
  styleUrls: ['./meeting-list-row.component.scss']
})
export class MeetingListRowComponent {

  @Input() user: User;
  @Input() meeting: Meeting;

  @Output() joinMeeting = new EventEmitter<Meeting>();

  constructor(public participationsService: ParticipationsService) { }
}
