import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'models';
import { UtilsService } from '../shared/services/utils.service';

export interface ContactForm {
  name: string;
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
  public loading: boolean;

  @Output()
  public submit = new EventEmitter<ContactForm>();

  public form: FormGroup;
  public formInvalid = false;

  constructor(private fb: FormBuilder, private utilsService: UtilsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        this.user && this.user.profile
          ? `${this.user.profile.firstName} ${this.user.profile.lastName}`
          : '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(this.utilsService.namePattern)
        ]
      ],
      phoneNumber: [
        (this.user && this.user.profile && this.user.profile.phoneNumber) || '',
        [
          Validators.required,
          Validators.pattern(this.utilsService.phonePattern)
        ]
      ],
      email: [
        (this.user && this.user.profile && this.user.profile.email) || '',
        [Validators.required, Validators.email]
      ],
      subject: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(this.utilsService.subjectPattern)
        ]
      ],
      body: ['', [Validators.maxLength(300)]]
    });

    this.form.valueChanges.subscribe(() => {
      this.formInvalid = false;
    });
  }

  get name() {
    return this.form.get('name');
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
        name: this.name.value.trim(),
        email: this.email.value,
        phoneNumber: this.utilsService.toInternationalPhoneNumber(
          this.phoneNumber.value.replace(/-/g, '')
        ),
        subject: this.subject.value.trim(),
        body: this.body.value
      };

      this.submit.emit(parsedForm);

      this.form.reset();
    } else {
      this.formInvalid = true;
      this.form.markAllAsTouched();
    }
  }
}
