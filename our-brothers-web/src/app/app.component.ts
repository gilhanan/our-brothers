import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public needLogin$ = this.authService.needLogin$;
  public user$ = this.authService.user;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    AOS.init();
  }

  logOut() {
    this.authService.signOut();
  }
}
