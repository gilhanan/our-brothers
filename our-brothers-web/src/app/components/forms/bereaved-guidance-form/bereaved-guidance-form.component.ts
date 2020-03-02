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
  public notIntereseted = false;

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
    label: '24.3 יום שלישי, בין השעות 1700-2100, בWEWORK חיפה',
    value: 'm1'
  },
  {
    label: '25.3 יום רביעי, בין השעות 1700-2100, בWEWORK ת"א',
    value: 'm2'
  },
  {
    label: '26.3 יום חמישי, בין השעות 1700-2100, בWEWORK ירושלים',
    value: 'm3'
  },
  {
    label: '29.3 יום ראשון, בין השעות 1700-2100, בWEWORK באר שבע ',
    value: 'm4'
  }
];
