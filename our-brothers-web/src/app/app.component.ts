import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

import { User } from 'models';
import { AuthService } from './shared/services/auth.service';
import { LoginMode } from './components/popups/login-popup/login-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loginMode: LoginMode;
  public loading = true;
  public user: User;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    AOS.init();

    this.authService.user.subscribe(user => {
      this.loading = false;
      this.user = user;
    });

    this.authService.needLogin$.subscribe(
      loginMode => (this.loginMode = loginMode)
    );
  }

  logOut() {
    this.authService.signOut();
  }
}
