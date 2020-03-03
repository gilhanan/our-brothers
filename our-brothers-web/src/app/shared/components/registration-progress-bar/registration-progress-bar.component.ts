import {Component, Input} from '@angular/core';
import {RegistrationProgressStep} from "./registration-progress-bar.types";

@Component({
  selector: 'app-registration-progress-bar',
  templateUrl: './registration-progress-bar.component.html',
  styleUrls: ['./registration-progress-bar.component.scss']
})
export class RegistrationProgressBarComponent {
  @Input() steps: RegistrationProgressStep[] = [];
  @Input() currentStep: number;
}
