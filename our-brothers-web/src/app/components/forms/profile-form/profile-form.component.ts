import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  ) {}

  ngOnInit() {
    if (this.authService.currentUser.profile.otherLang) {
      this.canTellInOtherLang = true;
    }

    this.profileForm = this.fb.group({
      // type: ['', Validators.required],
      email: [
        this.authService.currentUser.profile.email ||
          this.authService.currentFirebaseUser.email,
        [Validators.required, Validators.email]
      ],
      firstName: [
        this.authService.currentUser.profile.firstName,
        Validators.required
      ],
      lastName: [
        this.authService.currentUser.profile.lastName,
        Validators.required
      ],
      phoneNumber: [
        this.authService.currentUser.profile.phoneNumber,
        Validators.required
      ],
      address: [
        this.authService.currentUser.profile.address,
        Validators.required
      ],
      birthDay: [
        new Date(this.authService.currentUser.profile.birthDay),
        Validators.required
      ],
      otherLang: [this.authService.currentUser.profile.otherLang],
      agree: [false, Validators.required]
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
