import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bereaved-intro',
  templateUrl: './bereaved-intro.component.html',
  styleUrls: ['./bereaved-intro.component.scss']
})
export class BereavedIntroComponent {
  @Output() submit = new EventEmitter<void>();
}
