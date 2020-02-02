import {
  Component,
  OnInit,
  Input,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { startWith } from 'rxjs/operators';
import { RegistrationFormComponent } from '../../forms/registration-form/registration-form.component';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit, AfterViewInit {
  @Input() mode = 'Login';
  @ViewChildren(LoginFormComponent) loginFormQuery: QueryList<
    LoginFormComponent
  >;
  @ViewChildren(RegistrationFormComponent) registrationFormQuery: QueryList<
    RegistrationFormComponent
  >;

  private loginFormComponent: LoginFormComponent;
  private registrationFormComponent: RegistrationFormComponent;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loginFormQuery.changes.pipe(startWith(null)).subscribe(() => {
      if (this.loginFormQuery.first) {
        this.loginFormComponent = this.loginFormQuery.first;
      }
    });

    this.registrationFormQuery.changes.pipe(startWith(null)).subscribe(() => {
      if (this.registrationFormQuery.first) {
        this.registrationFormComponent = this.registrationFormQuery.first;
      }
    });
  }

  moveToLogin() {
    this.mode = 'Login';
  }

  moveToRegister() {
    this.mode = 'Register';
  }

  LoginOrRegister() {
    switch (this.mode) {
      case 'Login':
        this.loginFormComponent.signInWithEmailAndPass();
        break;
      case 'Register':
        this.registrationFormComponent.registerWithEmailAndPass();
        break;
    }
  }
}
