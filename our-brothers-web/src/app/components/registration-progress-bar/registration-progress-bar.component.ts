import { Component, OnInit, Input } from '@angular/core';

export interface RegistrationProgressStep {
  title: string;
}

@Component({
  selector: 'app-registration-progress-bar',
  templateUrl: './registration-progress-bar.component.html',
  styleUrls: ['./registration-progress-bar.component.scss']
})
export class RegistrationProgressBarComponent implements OnInit {

  @Input() steps: RegistrationProgressStep[] = [];

  @Input() currentStep: number

  constructor() { }

  ngOnInit() {
  }

}
