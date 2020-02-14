import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/model';

@Component({
  selector: 'app-participations-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './participations-buttons.component.html',
  styleUrls: ['./participations-buttons.component.scss']
})
export class ParticipationsButtonsComponent {

  @Input() user: User;

  constructor() { }
}
