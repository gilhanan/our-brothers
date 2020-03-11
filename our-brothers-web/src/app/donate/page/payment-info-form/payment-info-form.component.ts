import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'models';
import { UtilsService } from 'src/app/shared/services/utils.service';

export interface PaymentForm {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
}

@Component({
  selector: 'app-payment-info-form',
  templateUrl: './payment-info-form.component.html',
  styleUrls: ['./payment-info-form.component.scss']
})
export class PaymentInfoFormComponent implements OnInit {
  @Input()
  public user: User;

  @Input()
  public loading: boolean;

  @Output()
  public submit = new EventEmitter<PaymentForm>();

  public form: FormGroup;
  public formInvalid = false;

  constructor(private fb: FormBuilder, private utilsService: UtilsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        this.user && this.user.profile ? `${this.user.profile.firstName} ${this.user.profile.lastName}` : '',
        [Validators.required, Validators.maxLength(30), Validators.pattern(this.utilsService.namePattern)]
      ],
      phoneNumber: [
        (this.user && this.user.profile && this.user.profile.phoneNumber) || '',
        [Validators.required, Validators.pattern(this.utilsService.phonePattern)]
      ],
      email: [
        (this.user && this.user.profile && this.user.profile.email) || '',
        [Validators.required, Validators.email]
      ],
      country: [],
      city: [],
      street: []
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
  get country() {
    return this.form.get('country');
  }
  get city() {
    return this.form.get('city');
  }
  get street() {
    return this.form.get('street');
  }

  public onSubmit() {
    if (this.form.valid) {
      const parsedForm: PaymentForm = {
        name: this.name.value.trim(),
        email: this.email.value,
        phoneNumber: this.utilsService.toInternationalPhoneNumber(this.phoneNumber.value.replace(/-/g, '')),
        country: this.country.value.trim(),
        city: this.city.value.trim(),
        street: this.street.value.trim()
      };

      this.submit.emit(parsedForm);

      this.form.reset();
    } else {
      this.formInvalid = true;
      this.form.markAllAsTouched();
    }
  }
}
