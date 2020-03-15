import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlesPageComponent } from './articles-page.component';
import { CommonModule } from '@angular/common';

const routes = [
  {
    path: '',
    component: ArticlesPageComponent
  }
];

@NgModule({
  declarations: [ArticlesPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ArticlesPageModule {}
