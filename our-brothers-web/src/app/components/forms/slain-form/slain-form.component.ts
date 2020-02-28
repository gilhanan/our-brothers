import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

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

  public maxDate = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(this.utilsService.namePattern)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(this.utilsService.namePattern)
        ]
      ],
      deathDate: ['', Validators.required],
      story: ['',
        [
          Validators.minLength(100),
          Validators.maxLength(500)
        ]
      ]
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
        firstName: this.firstName.value.trim(),
        lastName: this.lastName.value.trim(),
        deathDate: new Date(this.deathDate.value).getTime(),
        story: this.story.value.trim()
      }

      this.submit.emit(parsedForm);
    }
  }
}
