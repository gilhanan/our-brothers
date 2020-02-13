import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfile } from 'src/app/model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  public profileForm: FormGroup;
  public canTellInOtherLang = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    const profile: UserProfile = this.authService.currentUser.profile || {} as UserProfile;

    if (profile.otherLang) {
      this.canTellInOtherLang = true;
    }

    this.profileForm = this.fb.group({
      // type: ['', Validators.required],
      email: [
        profile.email || this.authService.currentFirebaseUser.email,
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
        new Date(profile.birthDay),
        Validators.required
      ],
      otherLang: [profile.otherLang],
      agree: [false, Validators.requiredTrue]
    });

    console.log('birthDay', this.profileForm.get('birthDay').value);
  }

  get email() {
    return this.profileForm.get('email');
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  get address() {
    return this.profileForm.get('address');
  }

  get birthDay() {
    return this.profileForm.get('birthDay');
  }

  get otherLang() {
    return this.profileForm.get('otherLang');
  }

  get agree() {
    return this.profileForm.get('agree');
  }

  public saveProfile() {
    if (this.profileForm.valid) {
      const userData = {
        profile: this.profileForm.value,
        role: 'participate'
      };

      userData.profile.birthDay = new Date(userData.profile.birthDay).getTime();
      if (!this.canTellInOtherLang) {
        delete userData.profile.otherLang;
      }

      return this.dataService
        .updateUserData(this.authService.userId, userData)
        .pipe(
          map(() => {
            return true;
          })
        );
    } else {
      this.profileForm.markAllAsTouched();
      return of(false);
    }
  }
}
