import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public needLogin = false;
  public isLoggedIn = false;
  public user$ = this.authService.user;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.authService.needLogin$.subscribe(() => {
      this.needLogin = true;
    });
  }

  logOut() {
    this.authService.signOut();
  }
}
