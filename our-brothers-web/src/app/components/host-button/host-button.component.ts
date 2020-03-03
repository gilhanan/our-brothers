import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'models';
import { ParticipationsService } from '../../shared/services/participations.service';

@Component({
  selector: 'app-host-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './host-button.component.html',
  styleUrls: ['./host-button.component.scss']
})
export class HostButtonComponent {

  @Input() user: User;
  @Input() loading: boolean;

  constructor(public participationService: ParticipationsService) { }
}
