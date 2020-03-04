import { Component, Input, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'models';

interface HeaderSubMenus {
  meetings: boolean;
  about: boolean;
  admin: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public user: User;
  @Input() public loading = true;

  @Output() login = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  public isMobileView = false;
  isSideMenuClosed = true;
  subMenusStates: HeaderSubMenus = {
    meetings: false,
    about: false,
    admin: false
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateMobileViewState(window.innerWidth);

    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
      this.isSideMenuClosed = true;
    });
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  updateMobileViewState(width) {
    this.isMobileView = width <= 1200;
  }

  toggleSubMenu(subMenu: keyof HeaderSubMenus): void {
    this.subMenusStates[subMenu] = !this.subMenusStates[subMenu];
    if (this.subMenusStates[subMenu]) {
      for (let key in this.subMenusStates) {
        if (key !== subMenu) {
          this.subMenusStates[key] = false;
        }
      }
    }
  }

  onLogin() {
    this.isSideMenuClosed = true;
    this.login.emit();
  }

  onLogout() {
    this.isSideMenuClosed = true;
    this.logout.emit();
  }
}
