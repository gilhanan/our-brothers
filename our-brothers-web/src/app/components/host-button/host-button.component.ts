import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/model';
import { ParticipationsService } from 'src/app/services/participations.service';

@Component({
  selector: 'app-host-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './host-button.component.html',
  styleUrls: ['./host-button.component.scss']
})
export class HostButtonComponent {

  @Input() user: User;

  constructor(public participationService: ParticipationsService) { }
}
