import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface HostInputOption {
  text: string;
  value: any;
}

@Component({
  selector: 'app-host-input-options',
  templateUrl: './host-input-options.component.html',
  styleUrls: ['./host-input-options.component.scss']
})
export class HostInputOptionsComponent {
  @Input() iconUrl: string;
  @Input() label: string;
  @Input() options: HostInputOption[];
  @Input() currentOption: any;
  @Input() invalid: boolean;
  @Output() optionSelected = new EventEmitter<any>();
}
