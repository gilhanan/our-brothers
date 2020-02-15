import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface SlainForm {
  firstName: string;
  lastName: string;
  deathDate: number;
  story: string;
}

@Component({
  selector: 'app-slain-form',
  templateUrl: './slain-form.component.html',
  styleUrls: ['./slain-form.component.scss']
})
export class SlainFormComponent implements OnInit {
  public form: FormGroup;

  @Output()
  public submit = new EventEmitter<SlainForm>()

  constructor(private fb: FormBuilder, ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      deathDate: ['', Validators.required],
      story: ['', Validators.required]
    });
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get deathDate() {
    return this.form.get('deathDate');
  }

  get story() {
    return this.form.get('story');
  }

  onSubmit() {
    if (this.form.valid) {
      const parsedForm: SlainForm = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        deathDate: new Date(this.deathDate.value).getTime(),
        story: this.story.value
      }

      this.submit.emit(parsedForm);
    }
  }
}
