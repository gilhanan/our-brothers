import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tell-page',
  templateUrl: './tell-page.component.html',
  styleUrls: ['./tell-page.component.scss']
})
export class TellPageComponent implements OnInit {
  public currentStep = 0;
  public casualtyDetailsFrom: FormGroup;
  public trainingSession = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.casualtyDetailsFrom = this.fb.group({
      casualtyName: ['', Validators.required],
      casualtyDate: ['', Validators.required],
      casualtyStory: ['', Validators.required]
    });
  }

  get casualtyName() {
    return this.casualtyDetailsFrom.get('casualtyName');
  }

  get casualtyDate() {
    return this.casualtyDetailsFrom.get('casualtyDate');
  }

  get casualtyStory() {
    return this.casualtyDetailsFrom.get('casualtyStory');
  }

  goToStep1() {
    if (this.authService.requestToLogin()) {
      this.currentStep = 2;
    } else {
      this.currentStep = 1;
    }
  }

  goToStep3() {
    if (this.casualtyDetailsFrom.valid) {
      this.currentStep = 3;
    }
  }

  goToStep4() {
    if (this.trainingSession) {
      // Open the traning popup
    } else {
      this.currentStep = 4;
    }
  }
}
