import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

import { AuthService } from './services/auth.service';
import { ParticipationsService } from './services/participations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public needLogin = false;
  public user$ = this.authService.user;
  public userHasAllDetails = false;

  constructor(
    private authService: AuthService,
    private participationsService: ParticipationsService
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.userHasAllDetails = user && this.participationsService.isUserHaveAllDetails(user)
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
