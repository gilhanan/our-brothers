import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login-social-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-social-button.component.html',
  styleUrls: ['./login-social-button.component.scss']
})
export class LoginSocialButtonComponent {

  @Input() type: 'facebook' | 'google';

  icon() {
    if (this.type === 'facebook') {
      return '/assets/img/facebook-login-icon.png';
    } else if (this.type === 'google') {
      return '/assets/img/google-login-icon.png';
    }
  }
}
