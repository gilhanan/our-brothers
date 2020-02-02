import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { User } from '../model';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  loading = true;
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }

  signInWithGoogle() {
    this.authService.googleLogin();
  }

  signInWithFacebook() {
    this.authService.facebookLogin();
  }

  signOut() {
    this.authService.signOut();
  }
}
