import { Component, Input } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService, AuthErrors } from '../../shared/services/auth.service';
import { RegistrationForm } from '../registration-form/registration-form.types';
import { LoginForm } from '../login-form/login-form.types';
import { ForgotPasswordForm } from '../forgot-password-form/forgot-password-form.types';

export type LoginMode = 'Login' | 'Register' | 'Forgot';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent {
  @Input() mode: LoginMode = 'Login';

  loading: boolean;

  constructor(public authService: AuthService, private toastr: ToastrService) {}

  signInWithEmailAndPassword(form: LoginForm) {
    this.loading = true;
    this.authService
      .signInWithEmailAndPassword(form.email, form.password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => this.loginSuccess(),
        error => {
          const { code } = error;
          if (code === AuthErrors.UserNotFound || code === AuthErrors.WrongPassword) {
            this.toastr.error('אימייל או סיסמא לא נכונים.');
          } else {
            this.handleError();
          }
        }
      );
  }

  signInWithFacebook() {
    this.loading = true;
    this.authService
      .signInWithFacebook()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => this.loginSuccess(),
        error => {
          if (error.code !== AuthErrors.CancelledPopupRequest) {
            this.handleError();
          }
        }
      );
  }

  signInWithGoogle() {
    this.loading = true;
    this.authService
      .signInWithGoogle()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => this.loginSuccess(),
        error => {
          if (error.code !== AuthErrors.CancelledPopupRequest) {
            this.handleError();
          }
        }
      );
  }

  createUserWithEmailAndPassword(form: RegistrationForm) {
    this.loading = true;
    this.authService
      .createUserWithEmailAndPassword(form.email, form.password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => this.loginSuccess(),
        error => {
          if (error.code === AuthErrors.EmailAlreadyInUse) {
            this.toastr.warning('כתובת האימייל הזו נמצאת כבר בשימוש.');
          } else {
            this.handleError();
          }
        }
      );
  }

  resetPassword(form: ForgotPasswordForm) {
    this.loading = true;
    this.authService
      .sendPasswordResetEmail(form.email)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.toastr.success('נשלח בהצלחה מייל לאיפוס סיסמא.');
        })
      )
      .subscribe();
  }

  private handleError() {
    this.toastr.error('אירעה שגיאה, אנא נסה שנית.');
  }

  private loginSuccess() {
    this.authService.user.pipe(take(1)).subscribe(() => {
      this.toastr.success(`התחברת בהצלחה!`);
    });
  }
}
