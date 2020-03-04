import { NgModule } from '@angular/core';
import { QnaPageComponent } from './qna-page.component';
import { QnaModule } from '../qna.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes = [
  {
    path: '',
    component: QnaPageComponent
  }
];

@NgModule({
  imports: [QnaModule, RouterModule.forChild(routes), CommonModule],
  declarations: [QnaPageComponent]
})
export class QnaPageModule {}
