import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'models';
import { ParticipationsService } from '../../../services/participations.service';

@Component({
  selector: 'app-participate-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './participate-button.component.html',
  styleUrls: ['./participate-button.component.scss']
})
export class ParticipateButtonComponent {

  @Input() user: User;
  @Input() loading: boolean;

  constructor(public participationService: ParticipationsService) { }

}
