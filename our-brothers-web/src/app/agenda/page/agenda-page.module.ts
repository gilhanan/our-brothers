import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuotesService } from './quotes.service';
import { AgendaPageComponent } from './agenda-page.component';

const routes = [
  {
    path: '',
    component: AgendaPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [QuotesService],
  declarations: [AgendaPageComponent]
})
export class AgendaPageModule {}
