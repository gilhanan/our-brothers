import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

import { User } from 'models';
import { MenuItem } from './models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() public user: User;
  @Input() public loading = true;

  @Output() login = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  public sideMenuOpen = false;
  public menues: MenuItem[];

  constructor(private router: Router) {}

  ngOnChanges(): void {
    this.menues = this.initMenues();
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
      this.sideMenuOpen = false;
    });
  }

  onLogin() {
    this.sideMenuOpen = false;
    this.login.emit();
  }

  onLogout() {
    this.sideMenuOpen = false;
    this.logout.emit();
  }

  trackByFn(index: number) {
    return index;
  }

  private initMenues(): MenuItem[] {
    const menues = [
      { route: 'home', title: 'דף הבית' },
      {
        title: 'מפגשים',
        subMenues: [
          { route: 'meetings', title: 'מפגשים' },
          { route: 'tell', title: 'אני רוצה לספר' },
          { route: 'host', title: 'אני רוצה לארח' },
          { route: 'participate', title: 'אני רוצה להשתתף' }
        ]
      },
      {
        title: 'אודותינו',
        subMenues: [
          { route: 'about', title: 'רקע' },
          { route: 'team', title: 'הצוות שלנו' },
          { route: 'articles', title: 'עלינו בתקשורת' },
          { route: 'news', title: 'כותבים עלינו' }
        ]
      },
      { route: 'agenda', title: 'מבנה הערב' },
      { route: 'questions', title: 'שאלות' },
      { route: 'gallery', title: 'גלריה' },
      { route: 'contact', title: 'צרו קשר' }
    ];

    if (this.user?.isAdmin || this.user?.isVolunteer) {
      menues.push({
        title: 'ניהול',
        subMenues: [
          { route: 'admin-statistics', title: 'סטטיסטיקות' },
          { route: 'admin-bereaveds', title: 'ניהול אחים' },
          { route: 'admin-users', title: 'ניהול משתמשים' }
        ]
      });
    }

    return menues;
  }
}
