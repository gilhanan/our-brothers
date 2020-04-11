import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleItem } from '../article/article.component';
import * as Articles1 from '../../assets/articles1.json';
import * as Articles2 from '../../assets/articles2.json';
import * as Articles3 from '../../assets/articles3.json';
import * as Articles4 from '../../assets/articles4.json';

@Component({
  selector: 'articles-container',
  templateUrl: './articles-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./articles-container.component.scss']
})
export class ArticlesContainerComponent {
  public articles: ArticleItem[] = [];
  public maxArticlesPages: number = 4;
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
      case 2: {
        articlesFromJson = Articles2.articles;
        break;
      }
      case 3: {
        articlesFromJson = Articles3.articles;
        break;
      }
      case 4: {
        articlesFromJson = Articles4.articles;
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
