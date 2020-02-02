import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { AuthService } from './services/auth.service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'our-brothers-web';
  public needLogin = false;
  public isLoggedIn = false;
  public headerPartsWidth = {
    logoPart: null,
    linksPart: null,
    contactIconsPart: null,
    actionButtonsPart: null
  };
  public meduimMinWidth: number;
  public actionButtonsObserver: MutationObserver;

  @ViewChild('headerElm', { static: false }) headerElm: ElementRef;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngAfterViewInit() {
    this.calcHeaderBreakingPoints();
    this.updateHeaderLayout();

    const actionButtonsElm = this.headerElm.nativeElement.querySelector(
      '.action-buttons'
    );

    this.actionButtonsObserver = new MutationObserver(() => {
      const headerDom: HTMLElement = this.headerElm.nativeElement;

      const actionButtonsDom: HTMLElement = headerDom.querySelector(
        '.action-buttons'
      );

      this.headerPartsWidth.actionButtonsPart = actionButtonsDom.offsetWidth;

      this.meduimMinWidth =
        this.headerPartsWidth.logoPart +
        this.headerPartsWidth.linksPart +
        this.headerPartsWidth.contactIconsPart +
        this.headerPartsWidth.actionButtonsPart;
      this.updateHeaderLayout();
    });

    this.actionButtonsObserver.observe(actionButtonsElm, {
      subtree: true,
      childList: true
    });

    fromEvent(window, 'resize').subscribe(() => {
      this.updateHeaderLayout();
    });
  }

  calcHeaderBreakingPoints() {
    // 240, 120, 696, 160
    const headerDom: HTMLElement = this.headerElm.nativeElement;
    const logoDom: HTMLElement = headerDom.querySelector('.logo-header');
    const linksDom: HTMLElement = headerDom.querySelector('.links-header');
    const contactIconsDom: HTMLElement = headerDom.querySelector(
      '.contact-icons'
    );
    const actionButtonsDom: HTMLElement = headerDom.querySelector(
      '.action-buttons'
    );

    this.headerPartsWidth.logoPart = logoDom.offsetWidth;
    this.headerPartsWidth.linksPart = linksDom.offsetWidth;
    this.headerPartsWidth.contactIconsPart = contactIconsDom.offsetWidth;
    this.headerPartsWidth.actionButtonsPart = actionButtonsDom.offsetWidth;

    this.meduimMinWidth =
      this.headerPartsWidth.logoPart +
      this.headerPartsWidth.linksPart +
      this.headerPartsWidth.contactIconsPart +
      this.headerPartsWidth.actionButtonsPart;
  }

  updateHeaderLayout() {
    console.log(this.headerPartsWidth);
    const headerDom: HTMLElement = this.headerElm.nativeElement;
    if (headerDom.clientWidth < this.meduimMinWidth) {
      headerDom.classList.add('medium-mode');
    } else {
      headerDom.classList.remove('medium-mode');
    }
  }

  logout() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.actionButtonsObserver.disconnect();
  }
}
