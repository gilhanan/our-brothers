import { NgModule } from '@angular/core';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginSocialButtonComponent } from './login-social-button/login-social-button.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const api = [
  RegistrationFormComponent,
  LoginSocialButtonComponent,
  LoginPopupComponent,
  LoginFormComponent,
  ForgotPasswordFormComponent
];

@NgModule({
  declarations: api,
  exports: api,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AuthModule {}
