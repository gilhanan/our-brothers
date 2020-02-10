import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public user$ = this.authService.user;
  public needLogin = false;

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.signOut();
  }
}
