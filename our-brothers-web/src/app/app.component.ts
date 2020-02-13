import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

import { AuthService } from './services/auth.service';
import { ParticipationsService } from './services/participations.service';
import { User } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public needLogin = false;
  public isLoggedIn = false;
  public user$ = this.authService.user;
  public currentUser: User;
  public userHasAllDetails = false;

  constructor(
    private authService: AuthService,
    private participationsService: ParticipationsService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isLoggedIn = true;
        this.userHasAllDetails = this.participationsService.isUserHaveAllDetails(
          user
        );
      } else {
        this.isLoggedIn = false;
      }
    });

    this.authService.needLogin$.subscribe(() => {
      this.needLogin = true;
    });

    AOS.init();
  }

  logOut() {
    this.authService.signOut();
  }
}
