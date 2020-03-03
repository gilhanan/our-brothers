import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./articles-page.component.scss']
})
export class ArticlesPageComponent {}
