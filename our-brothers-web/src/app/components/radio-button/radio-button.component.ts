import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  @Input() isOn: boolean;
  @Output() toggled = new EventEmitter<null>();

  constructor() {}

  ngOnInit() {}
}
