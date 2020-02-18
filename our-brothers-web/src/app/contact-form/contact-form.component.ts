import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../model';
import { UtilsService } from '../services/utils.service';

export interface ContactForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  body: string;
}

@Component({
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public loading: boolean

  @Output()
  public submit = new EventEmitter<ContactForm>();

  public form: FormGroup;

  constructor(private fb: FormBuilder,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      fullName: [
        this.user && this.user.profile ? `${this.user.profile.firstName} ${this.user.profile.lastName}` : '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(this.utilsService.sentencePattern)
        ]
      ],
      phoneNumber: [
        this.user && this.user.profile && this.user.profile.phoneNumber || '',
        [
          Validators.required,
          Validators.pattern(this.utilsService.phonePattern)
        ]
      ],
      email: [
        this.user && this.user.profile && this.user.profile.email || '',
        [Validators.email]
      ],
      subject: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(this.utilsService.sentencePattern)
        ]
      ],
      body: [
        '',
        [Validators.maxLength(300)]
      ]
    });
  }

  get fullName() {
    return this.form.get('fullName');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get email() {
    return this.form.get('email');
  }
  get subject() {
    return this.form.get('subject');
  }
  get body() {
    return this.form.get('body');
  }

  public onSubmit() {
    if (this.form.valid) {
      const parsedForm: ContactForm = {
        fullName: this.fullName.value.trim(),
        email: this.email.value,
        phoneNumber: this.utilsService.toInternationalPhoneNumber(this.phoneNumber.value),
        subject: this.subject.value.trim(),
        body: this.body.value
      };

      this.submit.emit(parsedForm);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
