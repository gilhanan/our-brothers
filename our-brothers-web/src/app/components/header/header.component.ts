import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  public user: User;

  @Output()
  public logIn = new EventEmitter<void>();

  @Output()
  public logOut = new EventEmitter<void>();

  constructor() { }
}
