import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User as FirebaseUser } from 'firebase';
import { UserProfile, User } from 'src/app/model';

export interface ProfileForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public firebaseUser: FirebaseUser;

  @Output()
  public submit = new EventEmitter<ProfileForm>();

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const profile: UserProfile = this.user.profile || {} as UserProfile;

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

  get agree() {
    return this.form.get('agree');
  }

  public onSubmit() {
    if (this.form.valid) {
      const parsedForm: ProfileForm = {
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phoneNumber: this.phoneNumber.value
      };

      this.submit.emit(parsedForm);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
