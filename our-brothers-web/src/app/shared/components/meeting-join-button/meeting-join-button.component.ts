import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Meeting, User } from 'models';
import { ParticipationsService } from '../../services/participations.service';

@Component({
  selector: 'app-meeting-join-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meeting-join-button.component.html',
  styleUrls: ['./meeting-join-button.component.scss']
})
export class MeetingJoinButtonComponent {
  @Input() user: User;
  @Input() meeting: Meeting;

  @Output() join = new EventEmitter<void>();

  constructor(public participationsService: ParticipationsService) {}
}
