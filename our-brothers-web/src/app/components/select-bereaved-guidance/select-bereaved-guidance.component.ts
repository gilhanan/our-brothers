import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BereavedGuidanceGeneral } from 'models';

export interface BereavedGuidanceGeneralOption {
  value: BereavedGuidanceGeneral;
  label: string;
}

@Component({
  selector: 'app-select-bereaved-guidance',
  templateUrl: './select-bereaved-guidance.component.html',
  styleUrls: ['./select-bereaved-guidance.component.scss']
})
export class SelectBereavedGuidanceComponent {

  @Input() value: BereavedGuidanceGeneral;
  @Output() valueChange = new EventEmitter<BereavedGuidanceGeneral>();

  @Input() readonly: boolean = false;

  options: BereavedGuidanceGeneralOption[] = [{
    value: BereavedGuidanceGeneral.jerusalem,
    label: "ירושלים"
  }, {
    value: BereavedGuidanceGeneral.telAviv,
    label: "תל אביב"
  }, {
    value: BereavedGuidanceGeneral.haifa,
    label: "חיפה"
  }];

}
