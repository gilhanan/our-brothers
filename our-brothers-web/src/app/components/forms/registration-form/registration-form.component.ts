import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() haveUser = new EventEmitter<null>();
  public registrationForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        pass: ['', [Validators.required, Validators.minLength(6)]],
        passConfirm: ['', Validators.required]
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('pass').value;
    const confirmPass = group.get('passConfirm').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get pass() {
    return this.registrationForm.get('pass');
  }

  get passConfirm() {
    return this.registrationForm.get('passConfirm');
  }

  registerWithGoogle() {
    this.authService.googleLogin();
  }

  registerWithFacebook() {
    this.authService.facebookLogin();
  }

  registerWithEmailAndPass() {
    if (this.registrationForm.valid) {
      this.authService.emailPassRegistration(this.email.value, this.pass.value);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
