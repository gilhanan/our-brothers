import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header-toggler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-toggler.component.html',
  styleUrls: ['./header-toggler.component.scss']
})
export class HeaderTogglerComponent {
  @Input() active: boolean;
}
