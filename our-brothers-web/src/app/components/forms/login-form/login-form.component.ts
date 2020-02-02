import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() haveNoUser = new EventEmitter<null>();
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get pass() {
    return this.loginForm.get('pass');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  signInWithGoogle() {
    this.authService.googleLogin();
  }

  signInWithFacebook() {
    this.authService.facebookLogin();
  }

  signInWithEmailAndPass() {
    if (this.loginForm.valid) {
      this.authService.emailPassLogin(this.email.value, this.pass.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
