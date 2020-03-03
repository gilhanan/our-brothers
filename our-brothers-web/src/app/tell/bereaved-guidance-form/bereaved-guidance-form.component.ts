import { Component, EventEmitter, Output } from '@angular/core';
import { BereavedGuidance } from 'models';

export interface GuidanceMeeting {
  label: string;
  value: string;
}

@Component({
  selector: 'app-bereaved-guidance-form',
  templateUrl: './bereaved-guidance-form.component.html',
  styleUrls: ['./bereaved-guidance-form.component.scss']
})
export class BereavedGuidanceFormComponent {
  public guidances: GuidanceMeeting[] = traningMeetingsConst;
  public selectedGuidances = {};
  public notIntereseted = true;

  @Output()
  public submit = new EventEmitter<BereavedGuidance>();

  constructor() {}

  onGuidanceChange(id: string, value: boolean) {
    this.selectedGuidances[id] = value;
    this.notIntereseted = !Object.keys(this.selectedGuidances).filter(
      id => !!this.selectedGuidances[id]
    ).length;
  }

  onSubmit() {
    const selectedGuidancesIds = Object.keys(this.selectedGuidances).filter(
      id => !!this.selectedGuidances[id]
    );

    this.submit.emit({
      answered: true,
      general: selectedGuidancesIds.length ? selectedGuidancesIds : null
    });
  }
}

const traningMeetingsConst: GuidanceMeeting[] = [
  {
    label:
      "29.03.20 בבאר שבע בין השעות 17:30-21:30, משרדי WEWORK, רח' חלקיקי האור 16",
    value: 'm1'
  },
  {
    label: "31.03.20 בתל אביב בין השעות 17:00-21:00, משרדי WEWORK, רח' שוקן 23",
    value: 'm2'
  },
  {
    label:
      "01.04.20 בירושלים בין השעות 18:00-22:00, משרדי WEWORK, רח' קינג ג'ורג' 20",
    value: 'm3'
  },
  {
    label:
      "02.04.20 בחיפה בין השעות 17:00-21:00, משרדי WEWORK, רח' דרך העצמאות 45",
    value: 'm4'
  }
];
