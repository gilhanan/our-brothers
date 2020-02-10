import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public user$ = this.authService.user;
  public needLogin = false;

  constructor(private authService: AuthService) { }

  logOut() {
    this.authService.signOut();
  }

}
