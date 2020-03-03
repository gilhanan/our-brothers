import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  @Input() isOn: boolean;
  @Input() text = '';
  @Output() selected = new EventEmitter<null>();
}
