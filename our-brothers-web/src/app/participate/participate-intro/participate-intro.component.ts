import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-participate-intro',
  templateUrl: './participate-intro.component.html',
  styleUrls: ['./participate-intro.component.scss']
})
export class ParticipateIntroComponent {
  @Output() submit = new EventEmitter<void>();
}
