import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgendaPageComponent } from './agenda-page.component';

const routes = [
  {
    path: '',
    component: AgendaPageComponent
  }
];

@NgModule({
  declarations: [AgendaPageComponent],
  imports: [RouterModule.forChild(routes)]
})
export class AgendaPageModule {}
