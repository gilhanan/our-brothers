import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

import { User } from 'models';
import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';
import { LoginMode } from './auth/login-popup/login-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loginMode: LoginMode;
  public loading = true;
  public user: User;

  private updatedLastSignIn = false;

  constructor(public authService: AuthService, private dataService: DataService) {}

  ngOnInit() {
    AOS.init();

    this.authService.user.subscribe(user => {
      this.loading = false;
      this.user = user;

      if (!this.updatedLastSignIn) {
        this.updatedLastSignIn = false;
        this.dataService.updateUserLastSignIn(this.user).subscribe();
      }
    });

    this.authService.needLogin$.subscribe(loginMode => (this.loginMode = loginMode));
  }

  logOut() {
    this.authService.signOut();
  }
}
