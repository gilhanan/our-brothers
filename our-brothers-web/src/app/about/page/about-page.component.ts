import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {}
