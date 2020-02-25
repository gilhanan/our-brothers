import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BereavedStatus } from 'models';

export interface BereavedStatusOption {
  value: BereavedStatus;
  label: string;
}

@Component({
  selector: 'app-select-bereaved-status',
  templateUrl: './select-bereaved-status.component.html',
  styleUrls: ['./select-bereaved-status.component.scss']
})
export class SelectBereavedStatusComponent {

  @Input() value: BereavedStatus;
  @Output() valueChange = new EventEmitter<BereavedStatus>();

  @Input() readonly: boolean = false;

  options: BereavedStatusOption[] = [{
    value: BereavedStatus.done,
    label: "הסתיים"
  }, {
    value: BereavedStatus.inactive,
    label: "לא פעיל"
  }, {
    value: BereavedStatus.waiting,
    label: "ממתין"
  }];

}
