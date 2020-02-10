import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tell-page',
  templateUrl: './tell-page.component.html',
  styleUrls: ['./tell-page.component.scss']
})
export class TellPageComponent implements OnInit {
  public currentStep = 3;
  public casualtyDetailsFrom: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  goToStep3() {
    if (this.casualtyDetailsFrom.valid) {
      this.currentStep = 3;
    }
  }
}
