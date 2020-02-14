import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/model';
import { ParticipationsService } from 'src/app/services/participations.service';

@Component({
  selector: 'app-participate-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './participate-button.component.html',
  styleUrls: ['./participate-button.component.scss']
})
export class ParticipateButtonComponent {

  @Input() user: User;

  constructor(public participationService: ParticipationsService) { }

}
