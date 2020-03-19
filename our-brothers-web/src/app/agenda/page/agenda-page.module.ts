import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuotesService } from './quotes.service';
import { AgendaPageComponent } from './agenda-page.component';
import { PipesModule } from '../../shared/pipes/pipes.module';

const routes = [
  {
    path: '',
    component: AgendaPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PipesModule],
  providers: [QuotesService],
  declarations: [AgendaPageComponent]
})
export class AgendaPageModule {}
