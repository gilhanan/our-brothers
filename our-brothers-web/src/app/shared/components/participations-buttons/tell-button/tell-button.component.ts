import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'models';
import { ParticipationsService } from '../../../services/participations.service';

@Component({
  selector: 'app-tell-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tell-button.component.html',
  styleUrls: ['./tell-button.component.scss']
})
export class TellButtonComponent {
  @Input() user: User;
  @Input() loading: boolean;

  constructor(public participationService: ParticipationsService) {}
}
