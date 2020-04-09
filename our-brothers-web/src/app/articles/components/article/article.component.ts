import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ArticleItem {
  imgUrl: string;
  publishDate: Date;
  title: string;
  desc: string;
  href: string;
}

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input() articleItem: ArticleItem;
}
