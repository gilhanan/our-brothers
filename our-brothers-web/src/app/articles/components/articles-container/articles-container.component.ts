import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleItem } from '../article/article.component';
import * as Articles1 from '../../assets/articles1.json';

@Component({
  selector: 'articles-container',
  templateUrl: './articles-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./articles-container.component.scss']
})
export class ArticlesContainerComponent {
  public articles: ArticleItem[] = [];
  public maxArticlesPages: number = 1;
  public initialArticlesPage: number = 1;

  constructor() {
    this.handleSelectedNumberUpdate(this.initialArticlesPage);
  }

  public handleSelectedNumberUpdate(item: number): void {
    let articlesFromJson = undefined;
    switch (item) {
      case 1: {
        articlesFromJson = Articles1.articles;
        break;
      }
      default: {
        articlesFromJson = Articles1.articles;
        break;
      }
    }

    this.articles = [];
    for (let jsonArticle of articlesFromJson) {
      this.articles.push({
        imgUrl: jsonArticle.imgUrl,
        publishDate: new Date(jsonArticle.publishDate),
        title: jsonArticle.title,
        desc: jsonArticle.desc,
        href: jsonArticle.href
      });
    }
  }
}
