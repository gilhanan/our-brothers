import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Meeting, MeetingParticipate } from 'models';

@Component({
  selector: 'app-meeting-participates-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meeting-participates-list.component.html',
  styleUrls: ['./meeting-participates-list.component.scss']
})
export class MeetingParticipatesListComponent {
  @Input() public meetingParticipates: MeetingParticipate[];
}
