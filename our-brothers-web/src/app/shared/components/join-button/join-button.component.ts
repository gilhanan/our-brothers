import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Meeting, User } from 'models';
import { ParticipationsService } from '../../services/participations.service';

@Component({
  selector: 'app-join-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './join-button.component.html',
  styleUrls: ['./join-button.component.scss']
})
export class JoinButtonComponent {
  @Input() user: User;
  @Input() meeting: Meeting;
  @Input() adminMode = false; // TODO: Another solution

  @Output() joinMeeting = new EventEmitter<void>();

  constructor(public participationsService: ParticipationsService) {}
}
