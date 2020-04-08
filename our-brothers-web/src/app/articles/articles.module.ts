import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ArticlesContainerComponent } from './components/articles-container/articles-container.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesSwitcherComponent } from './components/articles-switcher/articles-switcher.component';

const routes = [
  {
    path: '',
    component: ArticlesContainerComponent
  }
];

@NgModule({
  declarations: [ArticlesContainerComponent, ArticleComponent, ArticlesSwitcherComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ArticlesModule {}
