import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  public profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      // type: ['', Validators.required],
      email: [
        this.authService.currentFirebaseUser.email,
        [Validators.required, Validators.email]
      ],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  get email() {
    return this.profileForm.get('email');
  }

  get name() {
    return this.profileForm.get('name');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get address() {
    return this.profileForm.get('address');
  }

  get birthDate() {
    return this.profileForm.get('birthDate');
  }

  public saveProfile() {
    if (this.profileForm.valid) {
      const userData = {
        profile: this.profileForm.value,
        role: 'participate'
      };

      userData.profile.birthDate = new Date(
        userData.profile.birthDate
      ).getTime();
      this.dataService.updateUserData(this.authService.userId, userData);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
