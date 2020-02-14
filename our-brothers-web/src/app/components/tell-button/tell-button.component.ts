import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/model';
import { ParticipationsService } from 'src/app/services/participations.service';

@Component({
  selector: 'app-tell-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tell-button.component.html',
  styleUrls: ['./tell-button.component.scss']
})
export class TellButtonComponent {

  @Input() user: User;

  constructor(public participationService: ParticipationsService) { }
}
