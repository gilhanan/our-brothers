import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BereavedGuidanceGeneral} from 'models';
import {BereavedGuidanceGeneralOption} from "./select-bereaved-guidance.types";

@Component({
  selector: 'app-select-bereaved-guidance',
  templateUrl: './select-bereaved-guidance.component.html'
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
