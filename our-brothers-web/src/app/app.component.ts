import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  public showConnectToCare = false;

  private updatedLastSignIn = false;

  constructor(private route: ActivatedRoute, public authService: AuthService, private dataService: DataService) {}

  ngOnInit() {
    AOS.init();

    this.route.queryParams
      .pipe(
        // https://github.com/angular/angular/issues/12157
        filter(queryParams => Object.keys(queryParams).length > 0 === window.location.href.includes('?'))
      )
      .subscribe(queryParams => {
        this.showConnectToCare = queryParams.referer !== 'connect-2-care';
      });

    this.authService.user.subscribe(user => {
      this.loading = false;
      this.user = user;

      if (!this.updatedLastSignIn && this.user) {
        this.updatedLastSignIn = true;
        this.dataService.updateUserLastSignIn(this.user).subscribe();
      }
    });

    this.authService.needLogin$.subscribe(loginMode => (this.loginMode = loginMode));
  }

  logOut() {
    this.authService.signOut();
  }
}
