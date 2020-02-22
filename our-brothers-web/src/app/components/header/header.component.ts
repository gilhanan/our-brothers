import { Component, Input, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

class HeaderSubMenus {
  meetings: boolean;
  about: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMobileView = false;
  isSideMenuClosed = true;
  subMenusStates: HeaderSubMenus = {
    meetings: false,
    about: false
  };

  @Input() public user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.updateMobileViewState(window.innerWidth);
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

  closeSideMenu() {
    this.isSideMenuClosed = true;
  }

  openSideMenu() {
    this.isSideMenuClosed = false;
  }
}
