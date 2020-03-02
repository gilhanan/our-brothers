import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MeetingParticipate, User, Meeting } from 'models';

@Component({
  selector: 'app-meeting-participates-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meeting-participates-list.component.html',
  styleUrls: ['./meeting-participates-list.component.scss']
})
export class MeetingParticipatesListComponent {
  @Input() user: User;
  @Input() meeting: Meeting;
  @Input() meetingParticipates: MeetingParticipate[];
}
