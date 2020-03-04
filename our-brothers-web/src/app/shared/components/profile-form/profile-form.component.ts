import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User as FirebaseUser } from 'firebase';
import { User, UserProfile } from 'models';
import { UtilsService } from '../../services/utils.service';
import { ProfileForm } from './profile-form.types';

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
  public formInvalid = false;

  constructor(private fb: FormBuilder, private utilsService: UtilsService) {}

  ngOnInit() {
    const profile: UserProfile = this.user.profile || ({} as UserProfile);

    this.form = this.fb.group({
      email: [profile.email || this.firebaseUser.email, [Validators.required, Validators.email]],
      firstName: [
        profile.firstName,
        [Validators.required, Validators.maxLength(20), Validators.pattern(this.utilsService.namePattern)]
      ],
      lastName: [
        profile.lastName,
        [Validators.required, Validators.maxLength(20), Validators.pattern(this.utilsService.namePattern)]
      ],
      phoneNumber: [profile.phoneNumber, [Validators.required, Validators.pattern(this.utilsService.phonePattern)]],
      agree: [false, Validators.requiredTrue]
    });

    this.form.valueChanges.subscribe(() => {
      this.formInvalid = false;
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
        firstName: this.firstName.value.trim(),
        lastName: this.lastName.value.trim(),
        phoneNumber: this.utilsService.toInternationalPhoneNumber(this.phoneNumber.value.replace(/-/g, ''))
      };

      this.submit.emit(parsedForm);
    } else {
      this.formInvalid = true;
      this.form.markAllAsTouched();
    }
  }
}
