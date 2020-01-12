import { Component, OnInit, Input } from '@angular/core';
import { UserType } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() mode = 'Register';

  constructor() {}

  ngOnInit() {}

  moveToLogin() {
    this.mode = 'Login';
  }

  moveToRegister() {
    this.mode = 'Register';
  }
}
