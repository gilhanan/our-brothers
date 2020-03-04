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
    switch (this.type) {
      case 'facebook':
        return '/assets/img/facebook-login-icon.png';
      case 'google':
        return '/assets/img/google-login-icon.png';
    }
  }
}
