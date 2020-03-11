import { Component, EventEmitter, Output } from '@angular/core';
import { BereavedGuidance, BereavedGuidanceGeneral, guidanceOptions, GuidanceOption } from 'models';

type GuidanceMap = {
  [id in BereavedGuidanceGeneral]: boolean;
};

@Component({
  selector: 'app-bereaved-guidance-form',
  templateUrl: './bereaved-guidance-form.component.html',
  styleUrls: ['./bereaved-guidance-form.component.scss']
})
export class BereavedGuidanceFormComponent {
  public options: GuidanceOption[] = guidanceOptions;
  public selected: GuidanceMap = { ...initSelected };
  public notIntereseted = true;

  @Output()
  public submit = new EventEmitter<BereavedGuidance>();

  constructor() {}

  onGuidanceChange(id: BereavedGuidanceGeneral, value: boolean) {
    this.selected[id] = value;
    this.notIntereseted = !Object.keys(this.selected).filter(id => !!this.selected[id]).length;
  }

  onNotInterestedChange(value: boolean) {
    this.notIntereseted = value;
    if (this.notIntereseted) {
      this.selected = {
        ...initSelected
      };
    }
  }

  onSubmit() {
    const selectedIds = Object.keys(this.selected).filter(id => !!this.selected[id]) as BereavedGuidanceGeneral[];

    this.submit.emit({
      answered: true,
      general: selectedIds.length ? selectedIds : null
    });
  }
}

const initSelected: GuidanceMap = {
  m1: false,
  m2: false,
  m3: false,
  m4: false
};
