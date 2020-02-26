import {
  Component,
  Input
} from '@angular/core';
import { LoginForm } from '../../forms/login-form/login-form.component';
import { RegistrationForm } from '../../forms/registration-form/registration-form.component';
import { ForgotPasswordForm } from '../../forms/forgot-password-form/forgot-password-form.component';
import { AuthService, AuthErrors } from 'src/app/services/auth.service';

type Mode = 'Login' | 'Register' | 'Forgot';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent {
  @Input() mode: Mode = 'Login';

  loading: boolean;

  constructor(public authService: AuthService) { }

  signInWithEmailAndPassword(form: LoginForm) {
    this.loading = true;
    this.authService.signInWithEmailAndPassword(form.email, form.password).subscribe(
      () => { },
      error => {
        if (error.code === AuthErrors.UserNotFound) {
          alert('אימייל לא קיים.');
        } else if (error.code === AuthErrors.WrongPassword) {
          alert('סיסמא לא נכונה.');
        } else {
          alert(error);
        }
      },
      () => this.loading = false);
  }

  signInWithFacebook() {
    this.loading = true;
    this.authService.signInWithFacebook().subscribe(
      () => { },
      error => {
        if (error.code !== AuthErrors.CancelledPopupRequest) {
          alert(error);
        }
      },
      () => this.loading = false);
  }

  signInWithGoogle() {
    this.loading = true;
    this.authService.signInWithGoogle().subscribe(
      () => { },
      error => {
        if (error.code !== AuthErrors.CancelledPopupRequest) {
          alert(error);
        }
      },
      () => this.loading = false);
  }

  createUserWithEmailAndPassword(form: RegistrationForm) {
    this.loading = true;
    this.authService.createUserWithEmailAndPassword(form.email, form.password).subscribe(
      () => { },
      error => {
        if (error.code !== AuthErrors.EmailAlreadyInUse) {
          alert('אימייל תפוס.');
        } else {
          alert(error);
        }
      },
      () => this.loading = false);
  }

  resetPassword(form: ForgotPasswordForm) {
    this.loading = true;
    this.authService.sendPasswordResetEmail(form.email).subscribe(
      () => alert('נשלח בהצלחה מייל לאיפוס סיסמא.'),
      error => {
        if (error.code === AuthErrors.UserNotFound) {
          alert('אימייל לא קיים');
        } else {
          alert('שגיאה');
        }
      },
      () => this.loading = false);
  }
}
