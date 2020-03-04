import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BereavedStatus } from 'models';
import { BereavedStatusOption } from './select-bereaved-status.types';

@Component({
  selector: 'app-select-bereaved-status',
  templateUrl: './select-bereaved-status.component.html'
})
export class SelectBereavedStatusComponent {
  @Input() value: BereavedStatus;
  @Output() valueChange = new EventEmitter<BereavedStatus>();

  @Input() readonly: boolean = false;

  options: BereavedStatusOption[] = [
    {
      value: BereavedStatus.done,
      label: 'הסתיים'
    },
    {
      value: BereavedStatus.inactive,
      label: 'לא פעיל'
    },
    {
      value: BereavedStatus.waiting,
      label: 'ממתין'
    }
  ];
}
