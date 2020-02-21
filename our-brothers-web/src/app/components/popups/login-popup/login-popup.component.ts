import {
  Component,
  Input,
  ViewChild
} from '@angular/core';
import { LoginFormComponent, LoginForm } from '../../forms/login-form/login-form.component';
import { RegistrationFormComponent, RegistrationForm } from '../../forms/registration-form/registration-form.component';
import { ForgotPasswordFormComponent, ForgotPasswordForm } from '../../forms/forgot-password-form/forgot-password-form.component';
import { AuthService, AuthErrors } from 'src/app/services/auth.service';

type Mode = 'Login' | 'Register' | 'Forgot';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent {
  @Input() mode: Mode = 'Login';

  @ViewChild(LoginFormComponent, { static: false }) loginForm: LoginFormComponent;
  @ViewChild(RegistrationFormComponent, { static: false }) registrationForm: RegistrationFormComponent;
  @ViewChild(ForgotPasswordFormComponent, { static: false }) forgotPasswordForm: ForgotPasswordFormComponent;

  loading: boolean;

  constructor(public authService: AuthService) { }

  signInWithEmailAndPassword(form: LoginForm) {
    this.loading = true;
    this.authService.signInWithEmailAndPassword(form.email, form.password).catch((error) => {
      if (error.code === AuthErrors.UserNotFound) {
        alert('אימייל לא קיים.');
      } else if (error.code === AuthErrors.WrongPassword) {
        alert('סיסמא לא נכונה.');
      } else {
        alert(error);
      }
    }).finally(() => this.loading = false);
  }

  signInWithFacebook() {
    this.loading = true;
    this.authService.signInWithFacebook()
      .catch((error) => {
        if (error.code !== AuthErrors.CancelledPopupRequest) {
          alert(error);
        }
      })
      .finally(() => this.loading = false);
  }

  signInWithGoogle() {
    this.loading = true;
    this.authService.signInWithGoogle()
      .catch((error) => {
        if (error.code !== AuthErrors.CancelledPopupRequest) {
          alert(error);
        }
      })
      .finally(() => this.loading = false);
  }

  createUserWithEmailAndPassword(form: RegistrationForm) {
    this.loading = true;
    this.authService.createUserWithEmailAndPassword(form.email, form.password)
      .catch((error) => {
        if (error.code !== AuthErrors.EmailAlreadyInUse) {
          alert('אימייל תפוס.');
        } else {
          alert(error);
        }
      })
      .finally(() => this.loading = false);
  }

  resetPassword(form: ForgotPasswordForm) {
    this.loading = true;
    this.authService.resetPassword(form.email)
      .catch((error: any) => {
        if (error.code === AuthErrors.UserNotFound) {
          alert('אימייל לא קיים');
        } else {
          alert('שגיאה');
        }
      })
      .then(() => {
        alert('נשלח בהצלחה מייל לאיפוס סיסמא.');
      })
  }
}
