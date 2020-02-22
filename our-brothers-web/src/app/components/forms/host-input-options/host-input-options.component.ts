import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface HostInputOption {
  text: string;
  value: any;
}

@Component({
  selector: 'app-host-input-options',
  templateUrl: './host-input-options.component.html',
  styleUrls: ['./host-input-options.component.scss']
})
export class HostInputOptionsComponent implements OnInit {
  @Input() iconUrl: string;
  @Input() label: string;
  @Input() options: HostInputOption[];
  @Input() currentOption: any;

  @Output() optionSelected = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}
