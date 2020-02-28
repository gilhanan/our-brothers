import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

import { User } from 'models';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public needLogin$ = this.authService.needLogin$;

  public loading = true;
  public user: User;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    AOS.init();

    this.authService.user.subscribe((user) => {
      this.loading = false;
      this.user = user;
    });
  }

  logOut() {
    this.authService.signOut();
  }
}
