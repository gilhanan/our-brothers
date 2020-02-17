import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfile, User, Address } from 'src/app/model';

export interface BereavedProfileForm {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  birthDay: number;
  otherLang: string;
}

@Component({
  selector: 'app-bereaved-profile-form',
  templateUrl: './bereaved-profile-form.component.html',
  styleUrls: ['./bereaved-profile-form.component.scss']
})
export class BereavedProfileFormComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public firebaseUser: firebase.User;

  @Output()
  public submit = new EventEmitter<BereavedProfileForm>();

  public form: FormGroup;
  public canTellInOtherLang = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const profile: UserProfile = this.user.profile || {} as UserProfile;

    if (profile.otherLang) {
      this.canTellInOtherLang = true;
    }

    this.form = this.fb.group({
      email: [
        profile.email || this.firebaseUser.email,
        [Validators.required, Validators.email]
      ],
      firstName: [
        profile.firstName,
        Validators.required
      ],
      lastName: [
        profile.lastName,
        Validators.required
      ],
      phoneNumber: [
        profile.phoneNumber,
        Validators.required
      ],
      address: [
        profile.address,
        Validators.required
      ],
      birthDay: [
        profile.birthDay,
        Validators.required
      ],
      otherLang: [profile.otherLang],
      agree: [false, Validators.requiredTrue]
    });
  }

  get email() {
    return this.form.get('email');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get address() {
    return this.form.get('address');
  }

  get birthDay() {
    return this.form.get('birthDay');
  }

  get otherLang() {
    return this.form.get('otherLang');
  }

  get agree() {
    return this.form.get('agree');
  }

  public onSubmit() {
    if (this.form.valid) {
      const parsedForm: BereavedProfileForm = {
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phoneNumber: this.phoneNumber.value,
        address: this.address.value,
        birthDay: new Date(this.birthDay.value).getTime(),
        otherLang: this.otherLang.value
      };

      this.submit.emit(parsedForm);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
