import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BereavedGuidanceGeneral, guidanceOptions } from 'models';

@Component({
  selector: 'app-select-bereaved-guidance',
  templateUrl: './select-bereaved-guidance.component.html'
})
export class SelectBereavedGuidanceComponent {
  @Input() value: BereavedGuidanceGeneral;
  @Output() valueChange = new EventEmitter<BereavedGuidanceGeneral[]>();

  @Input() readonly: boolean = false;

  options = guidanceOptions;
}
